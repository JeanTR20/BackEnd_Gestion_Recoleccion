import { IsNotEmpty, IsString, Length } from "class-validator";

export class NotificacionPersonalizadaDto {
    @IsString({message: 'La variable descripcion debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable descripcion no debe estar vacio'})
    @Length(6, 33, {message: 'La variable descripcion debe ser minimo de 10 y maximo de 230 caracteres'})
    titulo: string

    @IsString({message: 'La variable descripcion debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable descripcion no debe estar vacio'})
    @Length(10, 166, {message: 'La variable descripcion debe ser minimo de 10 y maximo de 230 caracteres'})
    descripcion: string;
}