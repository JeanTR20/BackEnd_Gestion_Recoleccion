import { IsDate, IsString } from "class-validator"

export class ListarIncidenciaDto{
    @IsString({message: 'La variable direccion debe ser de tipo string'})
    direccion: string

    @IsDate({message: 'La variable fecha_reporte debe ser de tipo date'})
    fecha_reporte: Date
}