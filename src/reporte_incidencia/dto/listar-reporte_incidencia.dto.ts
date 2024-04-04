import { Type } from "class-transformer"
import { IsBoolean, IsDate, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsString, Min } from "class-validator"
import { NumericType } from "typeorm"

export class ListarIncidenciaDto{
    @IsNumberString({}, {message: 'La variable id_rol debe ser de tipo numerico y string'})
    @IsIn(['2', '3'],{message: 'el 2 es rol del recolector(personal) y el 3 es el rol del residente(ciudadanos'})
    id_rol: string;

    @IsOptional()
    @IsString({message: 'La variable direccion debe ser de tipo string'})
    direccion?: string

    @IsOptional()
    @Type(()=> Date)
    @IsDate({message: 'La variable fecha_reporte debe ser de tipo date'})
    fecha_reporte?: Date

    @IsOptional()
    @IsNumberString({}, {message: 'La variable estado debe ser de tipo numerico string'})
    @IsIn(['0', '1'], {message: '0 -> estado pendiente, 1 -> estado culminado'})
    estado?: number
}