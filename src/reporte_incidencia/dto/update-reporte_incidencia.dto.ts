import { PartialType } from '@nestjs/swagger';
import { CreateReporteIncidenciaDto } from './create-reporte_incidencia.dto';

export class UpdateReporteIncidenciaDto extends PartialType(CreateReporteIncidenciaDto) {}
