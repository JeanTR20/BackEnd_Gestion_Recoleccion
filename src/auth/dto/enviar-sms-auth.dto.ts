import { IsNotEmpty, IsNumberString, Length } from "class-validator";

export class EnviarSmsAuthDto{
    @IsNotEmpty({message: 'El campo télefono no debe estar vacío'})
    @IsNumberString({}, {message: 'El campo télefono debe ser de tipo number string'})
    @Length(9, 9, {message: 'El campo télefono debe tener minimo 9 digitos'})
    telefono: string
}