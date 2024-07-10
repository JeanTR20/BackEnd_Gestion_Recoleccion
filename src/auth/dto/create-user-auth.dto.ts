import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
export class CreateUserAuhtDto{

    @IsNumberString({}, {message: 'La variable dni debe ser de tipo number string'})
    @IsNotEmpty({message: 'La variable dni no debe estar vacio'})
    @MaxLength(8, {message: 'La variable dni deber tene minimo 8 caracteres'})
    dni: string;

    @IsString({message: 'La variable nombre_usuario debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable nombre_usuario no debe estar vacio'})
    @Length(3, 40, {message: 'La variable nombre_usuario deber tene minimo 3 a 40 caracteres'})
    nombre_usuario: string;

    @IsString({message: 'La variable telefono debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable telefono no debe estar vacio'})
    @Length(9, 9, {message: 'La variable telefono debe tener 9  caracteres'})
    telefono: string;

    @IsString({message: 'La variable contrasena debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable contrasena no debe estar vacio'})
    @Length(8, 255, {message: 'La variable contrasena debe tener de 5 a 255 caracteres'})
    contrasena: string;
}