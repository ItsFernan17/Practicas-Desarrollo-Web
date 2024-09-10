import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'producto'})
export class Producto{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 50})
    nombre: string;

    @Column({type: 'varchar', length: 90, nullable: true})
    descripcion: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    precio: number;

    @Column({type:'int'})
    stock: number;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechaCreacion: Date;
}