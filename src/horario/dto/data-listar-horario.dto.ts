import { Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsNumberString, IsString, Min, isIn, } from "class-validator";

export class DataListarHorarioDto{

    @Type(() => Number)
    @Min(1, {message: 'La variable id_ruta no debe ser menor a 1'})
    @IsInt({message: 'La variable id_ruta debe ser de tipo numero entero'})
    id_ruta: number;

    @IsString({message: 'La variable dia debe ser de tipo string'})
    dia: string;
}