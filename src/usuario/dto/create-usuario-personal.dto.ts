import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateUsuarioPersonal{
    
    @IsString({message: 'La variable nombre_completo debe ser string'})
    @IsNotEmpty({message: 'La variable nombre_completo no debe estar vacio'})
    nombre_completo: string;
    
    @IsString({message: 'La variable apellido_paterno debe ser string'})
    @IsNotEmpty({message: 'La variable apellido_paterno no debe estar vacio'})
    apellido_paterno: string;
    
    @IsString({message: 'La variable apellido_materno debe ser string'})
    @IsNotEmpty({message: 'La variable apellido_materno no debe estar vacio'})
    apellido_materno: string;
    
    @IsString({message: 'La variable fecha_nacimiento debe ser string'})
    @IsNotEmpty({message: 'La variable fecha_nacimiento no debe estar vacio'})
    fecha_nacimiento: string;
    
    @IsString({message: 'La variable direccion debe ser string'})
    @IsNotEmpty({message: 'La variable direccion no debe estar vacio'})
    direccion:string;

    @IsString({message: 'La variable telefono debe ser string'})
    @IsNotEmpty({message: 'La variable telefono no debe estar vacio'})
    telefono:string;
    
    @IsString({message: 'La variable tipo_carnet debe ser string'})
    @IsNotEmpty({message: 'La variable tipo_carnet no debe estar vacio'})
    @IsIn(['DNI', 'PASAPORTE', 'CARNET DE EXTRANJERÍA'])
    tipo_carnet: string;
    
    @IsString({message: 'La variable carnet_identidad debe ser string'})
    @IsNotEmpty({message: 'La variable carnet_identidad no debe estar vacio'})
    carnet_identidad: string;
    
    @IsString({message: 'La variable genero debe ser string'})
    @IsNotEmpty({message: 'La variable genero no debe estar vacio'})
    @IsIn(['Masculino', 'Femenino'])
    genero:string;
    
    @IsOptional()
    @IsString({message: 'La variable imagen debe ser string'})
    imagen?:string;
    
    @IsString({message: 'La variable correo debe ser string'})
    @IsNotEmpty({message: 'La variable correo no debe estar vacio'})
    correo:string;
    
    @IsString({message: 'La variable nombre_usuario debe ser string'})
    @IsNotEmpty({message: 'La variable nombre_usuario no debe estar vacio'})
    nombre_usuario:string;
    
    @IsString({message: 'La variable contrasena debe ser string'})
    @IsNotEmpty({message: 'La variable contrasena no debe estar vacio'})
    contrasena:string;
}