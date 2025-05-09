import { Type } from "class-transformer";
import { IsDate, IsIn, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, MaxLength, Min } from "class-validator";

export class CreateReporteIncidenciaDto {
    @IsString({message: 'La variable descripcion debe ser de tipo string'})
    @MaxLength(500,{message: 'La variable descripcion debe ser de maximo de 255 caracteres'})
    @IsNotEmpty({message: 'La variable descripcion no debe estar vacio'})
    descripcion: string;

    @IsString({message: 'La variable direccion debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable direccion no debe estar vacio'})
    direccion: string;

    @IsString({message: 'La variable referencia_calle debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable referencia_calle no debe estar vacio'})
    referencia_calle: string;
    
    // @IsString({message: 'La variable fecha_reporte deber ser de tipo string'})
    // @IsNotEmpty({message: 'La variable fecha_reporte no debe estar vacio'})
    // fecha_reporte: string;
    
    @IsString({message: 'La variable foto debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable foto no debe estar vacio'})
    foto: string;

    // @Type(()=> Number)
    // @IsInt({message: 'La variable de usuario_id debe ser de tipo entero'})
    // @Min(1, { message: 'El idCurso no debe ser menor a 1' })
    @IsString({message: 'La variable token_usuario debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable token_usuario no debe estar vacio'})
    token_usuario: string
}
