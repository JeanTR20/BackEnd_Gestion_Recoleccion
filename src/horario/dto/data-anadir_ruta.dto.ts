import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class DataAnadirRutaDto{
    @IsString({message: 'La variable ruta_nombre debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable ruta_nombre no debe estar vacio'})
    ruta_nombre: string;

    @IsOptional()
    @IsString({message: 'La variable ruta_descripcion debe ser de tipo string'})
    ruta_descripcion?: string;
}