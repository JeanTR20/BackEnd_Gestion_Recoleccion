import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class DataNotificacionDto{

    @IsString({message: 'La variable ruta debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable ruta no debe estar vacio'})
    ruta: string

    @IsString({message: 'La variable hora debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable hora no debe estar vacio'})
    hora: string

    @IsString({message: 'La variable dia debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable dia no debe estar vacio'})
    dia:string
}