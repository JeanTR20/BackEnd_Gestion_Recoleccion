import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto{
    
    @IsString({message: 'La variable correo debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable correo_usuario no debe estar vacio'})
    correo_usuario: string;

    @IsString()
    @MinLength(5, {message: 'La variable contraseña no debe ser menor a 5 caracteres'})
    @MaxLength(20, {message: 'La variable contraseña no debe ser mayor a 20 caracteres'})
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])$/, {
    // message:
    //   'La contraseña debe contener entre 5 y 20 caracteres, incluyendo al menos una letra mayúscula y una letra minúscula',
    // })
    contrasena: string;
}