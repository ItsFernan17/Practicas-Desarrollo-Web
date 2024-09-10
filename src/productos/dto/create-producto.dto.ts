import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, Min, IsOptional } from "class-validator";


export class CreateProductoDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    readonly nombre: string;

    @IsString()
    @MaxLength(90)
    @IsOptional()
    readonly descripcion?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.5)
    readonly  precio: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    readonly stock: number;
}