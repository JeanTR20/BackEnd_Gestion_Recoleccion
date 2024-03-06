import { IsEmail, IsString, Length, length } from "class-validator";

export class RecoverAuthDto {

    // @IsString({message: 'La variable token_residente debe ser de tipo string'})
    // token: string;

    @IsString({message: 'La variable correo debe ser de tipo string'})
    @IsEmail({}, {message: 'La variable correo debe ser de tipo email'})
    @Length(5, 255, {message: 'La variable corrreo debe ser maximo de 5 a 255 caracteres'})
    correo: string;

}