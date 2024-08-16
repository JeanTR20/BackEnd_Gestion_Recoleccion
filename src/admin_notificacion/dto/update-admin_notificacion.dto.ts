import { PartialType } from '@nestjs/swagger';
import { CreateAdminNotificacionDto } from './create-admin_notificacion.dto';

export class UpdateAdminNotificacionDto extends PartialType(CreateAdminNotificacionDto) {}
