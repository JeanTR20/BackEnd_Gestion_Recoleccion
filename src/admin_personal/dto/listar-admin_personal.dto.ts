import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsIn, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class ListarAdminPersonal{

    @IsOptional()
    @IsNumberString({}, {message: 'La variable numero_carnet debe ser de tipo numerico string'})
    @MaxLength(11, {message: 'La variable numero carnet debe ser maximo de 11 digitos'})
    @MinLength(8, {message: 'La variable numero carnet debe ser minimo de 8 digitos'})
    numero_carnet?: string;

    @IsOptional()
    @IsString({message: 'La variable apellidos_nombres deben ser de tipo string'})
    apellidos_nombres?: string;

    @Type(()=> Number)
    @IsNumber()
    @IsIn([0, 1], {message: '0 -> false(cuenta suspendida) , 1 -> true(cuenta activa)'})
    estado: number;
}