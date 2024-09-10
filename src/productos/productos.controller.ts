import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto, UpdateProductoDto } from './dto';

@Controller('productos')
export class ProductosController {

    constructor(
        private readonly productoService: ProductosService
    ){}

    @Get()
    getProductos(){
        return this.productoService.findAllProductos();
    }

    @Get(':id')
    getProductoId(@Param('id') id: string){
        return this.productoService.findById(id);
    }

    @Post()
    createProducto(@Body() newProducto: CreateProductoDto){
        return this.productoService.crearProducto(newProducto)
    }
    
    @Put(':id')
    updateProducto(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto){
        return this.productoService.updateProducto(id, updateProductoDto);
    }

    @Delete(':id')
    deleteProducto(@Param('id') id: string){
        return this.productoService.deleteProducto(id);
    }

}
