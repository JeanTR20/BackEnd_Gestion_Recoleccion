import { IsEmail, IsString, Length, length } from "class-validator";

export class RecoverAuthDto {

    @IsString({message: 'La variable token debe ser de tipo string'})
    token: string;

    @IsString({message: 'La variable correo debe ser de tipo string'})
    @Length(5, 255, {message: 'La variable nuevo_password debe ser maximo de 5 a 255 caracteres'})
    nuevo_password: string;

}