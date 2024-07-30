import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminResidenteDto {

    @IsString({message: 'La variable telefono debe ser string'})
    @IsNotEmpty({message: 'La variable telefono no debe estar vacio'})
    telefono:string;
    
    @IsString({message: 'La variable carnet_identidad debe ser string'})
    @IsNotEmpty({message: 'La variable carnet_identidad no debe estar vacio'})
    carnet_identidad: string;
        
    @IsString({message: 'La variable nombre_usuario debe ser string'})
    @IsNotEmpty({message: 'La variable nombre_usuario no debe estar vacio'})
    nombre_usuario:string;
}
