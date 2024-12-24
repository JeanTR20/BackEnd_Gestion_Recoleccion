import { Type } from "class-transformer"
import { IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min} from "class-validator"

export class ListarMiReporteByPaginacionDto{

    @IsString({message: 'La variable token_usuario debe ser de tipo string'})
    @IsNotEmpty({message: 'La variable token_usuario no debe estar vacio'})
    token_usuario: string
    
    // @IsNumberString({}, {message: 'La variable id_rol debe ser de tipo numerico y string'})
    // @IsIn(['2', '3'],{message: 'el 2 es rol del recolector(personal) y el 3 es el rol del residente(ciudadanos'})
    // id_rol: string;

    @IsNumberString({}, {message: 'La variable estado debe ser de tipo numerico string'})
    @IsIn(['0', '1'], {message: '0 -> estado pendiente, 1 -> estado culminado'})
    estado: string;

    @IsNumber({}, {message: 'La variable page debe ser de tipo numerico'})
    @Type(()=> Number)
    @IsNotEmpty({message: 'La variable page no debe estar vacio'})
    @Min(1, {message: 'La variable page no debe ser menor a 1'})
    page: number;
    
    @IsNumber({}, {message: 'La variable sizePage debe ser de tipo numerico'})
    @Type(()=> Number)
    @IsNotEmpty({message: 'La variable page no debe estar vacio'})
    @Min(1, {message: 'La variable sizePage no debe ser menor a 1'})
    sizePage: number;
}