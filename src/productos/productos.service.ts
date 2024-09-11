import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './model/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto, UpdateProductoDto } from './dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductosService {

    constructor(@InjectRepository(Producto) 
    private productoRepository: Repository<Producto>){}

    findAllProductos(){
        return this.productoRepository.find();
    }

    async findById(id: string){
        const productoExistente = await this.productoRepository.findOne({where: {id}})
        
        if(!productoExistente){
            return new HttpException('El producto con el ID proporcionado no existe en la base de datos.', HttpStatus.NOT_FOUND)
        }

        return productoExistente;
    }

    async crearProducto(crearProductoDto: CreateProductoDto){
        const productoExistente = await this.productoRepository.findOne({
            where: {
                nombre: crearProductoDto.nombre
            }
        })
        
        if(productoExistente){
            return new HttpException('El producto con el ID proporcionado no existe en la base de datos.', 400)
        }
        const newProducto = this.productoRepository.create(
            {
                id: uuid(),
                ...crearProductoDto,
            }
        );
        return this.productoRepository.save(newProducto);  
    }

    async updateProducto(id: string, updateProductoDto: UpdateProductoDto){
        const productoExistente = await this.productoRepository.findOne({where: {id}});

        if(!productoExistente){
            return new HttpException('El producto con el ID proporcionado no existe en la base de datos.', HttpStatus.NOT_FOUND);
        }

        const updateProducto = Object.assign(productoExistente, updateProductoDto);
        return this.productoRepository.save(updateProducto);
    }

    async deleteProducto(id: string){
        const resultado = await this.productoRepository.delete({id});

        if(resultado.affected === 0){
            return new HttpException('El producto con el ID proporcionado no existe en la base de datos.', HttpStatus.NOT_FOUND);
        }
        return resultado;
    }
}
