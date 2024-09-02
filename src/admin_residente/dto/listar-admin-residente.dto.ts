import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class ListarAdminResidenteDto {
    
    @IsOptional()
    @IsNumberString({}, {message: 'La variable numero_carnet debe ser de tipo numerico string'})
    @MaxLength(11, {message: 'La variable numero_carnet debe ser maximo de 11 digitos'})
    @MinLength(8, {message: 'La variable numero_carnet debe ser minimo de 8 digitos'})
    numero_carnet?: string;

    @IsOptional()
    @IsString({message: 'La variable nombres_usuario deben ser de tipo string'})
    nombres_usuario?: string;
    
    @IsNumber({}, {message: 'La variable page debe ser de tipo numerico'})
    @Type(()=> Number)
    @IsNotEmpty({message: 'La variable page no debe estar vacio'})
    @Min(1, {message: 'La variable page no debe ser menor a 1'})
    page: number;
    
    @IsNumber({}, {message: 'La variable sizePage debe ser de tipo numerico'})
    @Type(()=> Number)
    @IsNotEmpty({message: 'La variable sizePage no debe estar vacio'})
    @Min(1, {message: 'La variable sizePage no debe ser menor a 1'})
    sizePage: number;
}