import { IsNumber, IsString, MaxLength, MinLength, Min, IsOptional, IsInt } from "class-validator";

export class UpdateProductoDto{

    @IsString()
    @IsOptional()
    @MinLength(3, {message: "El nombre debe de tener mínimo 3 caracteres"})
    @MaxLength(50, {message: "El nombre debe de tener máximo 50 caracteres"})
    readonly nombre?: string;

    @IsString()
    @MaxLength(90, {message: "La descripción del producto debe de tener máximo 90 caracteres"})
    @IsOptional()
    readonly descripcion?: string;

    @IsNumber()
    @IsOptional()
    @Min(0.5, {message: "El precio debe de ser mayor que 0"})
    readonly precio?: number;

    @IsInt({message: "El stock debe ser un número entero"})
    @IsOptional()
    @Min(0, {message: "El stock debe ser mayor o igual a 0"})
    readonly stock?: number;
}