import { Type } from "class-transformer"
import { IsDate, IsOptional, IsString } from "class-validator"

export class ListarIncidenciaDto{
    @IsOptional()
    @IsString({message: 'La variable direccion debe ser de tipo string'})
    direccion?: string

    @IsOptional()
    @Type(()=> Date)
    @IsDate({message: 'La variable fecha_reporte debe ser de tipo date'})
    fecha_reporte?: Date
}