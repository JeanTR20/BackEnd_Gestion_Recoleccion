import { IsIn, IsNumberString, IsOptional } from 'class-validator';

export class UpdateReporteIncidenciaDto{
    @IsOptional()
    @IsNumberString({}, {message: 'La variable estado debe ser de tipo numerico string'})
    @IsIn(['0', '1'], {message: '0 -> estado pendiente, 1 -> estado culminado'})
    estado?: string
}
