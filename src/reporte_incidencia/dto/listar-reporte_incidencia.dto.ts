import { Type } from "class-transformer"
import { IsDate, IsIn, IsNumber, IsNumberString, IsOptional, IsString, Min } from "class-validator"
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
}