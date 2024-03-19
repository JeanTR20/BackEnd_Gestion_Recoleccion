import { PartialType } from '@nestjs/swagger';
import { CreateAdminPersonalDto } from './create-admin_personal.dto';

export class UpdateAdminPersonalDto extends PartialType(CreateAdminPersonalDto) {}
