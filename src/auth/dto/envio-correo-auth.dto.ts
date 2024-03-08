import { IsEmail, IsString, Length } from "class-validator";

export class EnvioCorreoAuthDto{
    @IsString({message: 'La variable correo debe ser de tipo string'})
    @IsEmail({}, {message: 'La variable correo debe ser de tipo email'})
    @Length(5, 255, {message: 'La variable nuevo_password debe ser maximo de 5 a 255 caracteres'})
    correo: string;
}
