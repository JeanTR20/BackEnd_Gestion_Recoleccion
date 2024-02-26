import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';
export class CreateUserAuhtDto{
    @IsString({message: 'La variable nombre_usuario debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable nombre_usuario no debe estar vacio'})
    @Length(6, 15, {message: 'La variable nombre_usuario deber tene minimo 6 a 15 caracteres'})
    nombre_usuario: string;

    @IsString({message: 'La variable nombre_usuario debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable nombre_usuario no debe estar vacio'})
    @IsEmail({}, {message: 'La variable correo deber ser de tipo correo'})
    @Length(5, 255, {message: 'La variable correo debe tener de 5 a 255 caracteres'})
    correo: string;

    @IsString({message: 'La variable nombre_usuario debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable nombre_usuario no debe estar vacio'})
    @Length(5, 255, {message: 'La variable contrasena debe tener de 5 a 255 caracteres'})
    contrasena: string;

}