import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class DataNotificacionDto{

    subscripcion: string

    @IsString({message: 'La variable dia debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable dia debe ser de tipo string'})
    hora: string

    @IsString({message: 'La variable dia debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable dia debe ser de tipo string'})
    dia:string
}