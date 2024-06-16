import { IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ListarAdminResidenteDto {
    
    @IsOptional()
    @IsNumberString({}, {message: 'La variable numero_carnet debe ser de tipo numerico string'})
    @MaxLength(11, {message: 'La variable numero_carnet debe ser maximo de 11 digitos'})
    @MinLength(8, {message: 'La variable numero_carnet debe ser minimo de 8 digitos'})
    numero_carnet?: string;

    @IsOptional()
    @IsString({message: 'La variable nombres_usuario deben ser de tipo string'})
    nombres_usuario?: string;
}