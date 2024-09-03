import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ListAdminFilterHorarioDto{
    @Type(() => Number)
    @Min(1, {message: 'La variable id_ruta no debe ser menor a 1'})
    @IsInt({message: 'La variable id_ruta debe ser de tipo numero entero'})
    @IsOptional()
    id_ruta?: number;

    @IsString({message: 'La variable dia debe ser de tipo string'})
    @IsOptional()
    dia?: string;

    @IsString({message: 'La variable recorrido debe ser de tipo string'})
    @IsOptional()
    recorrido?: string;
}