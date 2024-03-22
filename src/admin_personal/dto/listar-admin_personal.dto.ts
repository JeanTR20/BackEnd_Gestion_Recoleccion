import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ListarAdminPersonal{

    @Type(()=> Number)
    @IsOptional()
    @IsNumberString({}, {message: 'La variable numero_carnet debe ser de tipo numerico string'})
    @MaxLength(11, {message: 'La variable numero carnet debe ser maximo de 11 digitos'})
    @MinLength(8, {message: 'La variable numero carnet debe ser minimo de 6 digitos'})
    numero_carnet?: string;

    @IsOptional()
    @IsString({message: 'La variable apellidos_nombres deben ser de tipo string'})
    apellidos_nombres?: string;

    @Type(()=> Boolean)
    @IsBoolean({message: 'La variable estado debe ser de tipo boleano'})
    estado:Boolean
}