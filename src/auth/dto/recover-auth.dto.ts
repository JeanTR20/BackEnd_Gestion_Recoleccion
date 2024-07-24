import { IsNumberString, IsString, Length} from "class-validator";

export class RecoverAuthDto {

    @IsNumberString({}, {message: 'La variable telefono debe ser de tipo number string'})
    @Length(9, 9, {message: 'La variable telefono deber de de minimo y maximo de 9 digitos'})
    telefono: string;

    @IsString({message: 'La variable correo debe ser de tipo string'})
    @Length(5, 255, {message: 'La variable nuevo_password debe ser maximo de 5 a 255 caracteres'})
    nuevo_password: string;

}