import { IsNumberString, Length } from "class-validator";

export class EnviarSmsAuthDto{
    @IsNumberString({}, {message: 'La variable telefono debe ser de tipo number string'})
    @Length(9, 9, {message: 'La variable telefono deber de de minimo y maximo de 9 digitos'})
    telefono: string
}