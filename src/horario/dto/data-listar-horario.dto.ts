import { Type } from "class-transformer";
import { IsIn, IsNumber, IsNumberString, IsString, isIn } from "class-validator";

export class DataListarHorarioDto{
    @IsIn(['1','2'])
    @IsNumberString({}, {message: 'La variable ruta debe ser de tipo Numerico string'})
    ruta: number;

    @IsString({message: 'La variable dia debe ser de tipo string'})
    dia: string;
}