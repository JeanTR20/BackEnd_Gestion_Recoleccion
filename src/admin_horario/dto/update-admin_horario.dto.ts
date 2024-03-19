import { PartialType } from '@nestjs/swagger';
import { CreateAdminHorarioDto } from './create-admin_horario.dto';

export class UpdateAdminHorarioDto extends PartialType(CreateAdminHorarioDto) {}
