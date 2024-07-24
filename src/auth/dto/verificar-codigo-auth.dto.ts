import { IsNumberString, Length } from "class-validator"

export class VerificarCodigoAuthDto {
    @IsNumberString({}, {message: 'La variable telefono debe ser de tipo number string'})
    @Length(9, 9, {message: 'La variable telefono deber de de minimo y maximo de 9 digitos'})
    telefono: string;

    @IsNumberString({}, {message: 'La variable codigo_verificacion debe ser de tipo number string'})
    @Length(6, 6, {message: 'La variable codigo_verificacion deber ser de un minimo y maximo de 6 digitos'})
    codigo_verificacion: string
}