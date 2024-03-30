import { Type } from "class-transformer";
import { IsDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateAdminHorarioDto {
    @IsString({message: 'La variable dia debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable dia no debe estar vacio'})
    @IsIn(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], {})
    dia: string;

    @Type(() => Date)
    @IsDate({message: 'La variable hora_inicio debe ser de tipo date'})
    @IsNotEmpty({message: 'La variable hora_inicio no debe estar vacio'})
    hora_inicio: Date;
    
    @IsString({message: 'La variable recorrido debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable recorrido no debe estar vacio'})
    recorrido: string;
    
    @IsString({message: 'La variable referencia_punto debe ser de tipo string'})
    @IsOptional()
    @IsNotEmpty({message: 'La variable referencia_punto no debe estar vacio'})
    referencia_punto?: string;
    
    @Type(()=> Number)
    @IsInt({message: 'La variable ruta_id debe ser un numero entero'})
    @IsNotEmpty({message: 'La variable ruta_id no debe estar vacio'})
    @Min(1, {message: 'La variable ruta_id no debe ser menor a 1'})
    ruta_id: number
}
