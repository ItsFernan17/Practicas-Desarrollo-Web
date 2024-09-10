import { IsNumber, IsString, MaxLength, MinLength, Min, IsOptional } from "class-validator";

export class UpdateProductoDto{

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    readonly nombre?: string;

    @IsString()
    @MaxLength(90)
    @IsOptional()
    readonly descripcion?: string;

    @IsNumber()
    @IsOptional()
    @Min(0.5)
    readonly precio?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    readonly stock?: number;
}