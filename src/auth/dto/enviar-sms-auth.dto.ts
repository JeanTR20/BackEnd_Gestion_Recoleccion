import { IsNumberString, Length } from "class-validator";

export class EnviarSmsAuthDto{
    @IsNumberString({}, {message: 'La campo télefono debe ser de tipo number string'})
    @Length(9, 9, {message: 'El campo télefono debe tener  minimo y maximo de 9 digitos'})
    telefono: string
}