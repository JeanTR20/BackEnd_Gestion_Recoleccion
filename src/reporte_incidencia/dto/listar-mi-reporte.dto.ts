import { Type } from "class-transformer"
import { IsIn, IsNumberString, Min } from "class-validator"

export class ListarMiReporteDto{

    @Type(()=> Number)
    @Min(1, {message: 'La variable id_usuario no debe ser menor a 1'})
    id_usuario: string;
    
    @IsNumberString({}, {message: 'La variable id_rol debe ser de tipo numerico y string'})
    @IsIn(['2', '3'],{message: 'el 2 es rol del recolector(personal) y el 3 es el rol del residente(ciudadanos'})
    id_rol: string;

    @IsNumberString({}, {message: 'La variable estado debe ser de tipo numerico string'})
    @IsIn(['0', '1'], {message: '0 -> estado pendiente, 1 -> estado culminado'})
    estado?: string;
}