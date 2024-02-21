import { Type } from "class-transformer";
import { IsIn, IsNumber, IsNumberString, IsString, isIn } from "class-validator";

export class DataListarHorarioDto{
    // @Type(()=> Number)
    @IsIn(['1','2'])
    @IsNumberString({}, {message: 'La variabel ruta debe ser de tipo Numerico string'})
    ruta: number;

    @IsString({message: 'La variable dia debe ser de tipo string'})
    dia: string;
}