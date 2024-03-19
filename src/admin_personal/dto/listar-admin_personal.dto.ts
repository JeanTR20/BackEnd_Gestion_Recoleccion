import { Type } from "class-transformer";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class ListarAdminPersonal{

    @Type(()=> Number)
    @IsNumber({}, {message: 'La variable numero_carnet debe ser de tipo numero'})
    @MaxLength(11, {message: 'La variable numero carnet debe ser maximo de 11 digitos'})
    @MinLength(8, {message: 'La variable numero carnet debe ser minimo de 6 digitos'})
    numero_carnet: number;

    @IsString({message: 'La variable apellidos_nombres deben ser de tipo string'})
    apellidos_nombres: string;
}