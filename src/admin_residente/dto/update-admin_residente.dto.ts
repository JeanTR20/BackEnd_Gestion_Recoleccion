import { PartialType } from '@nestjs/swagger';
import { CreateAdminResidenteDto } from './create-admin_residente.dto';

export class UpdateAdminResidenteDto extends PartialType(CreateAdminResidenteDto) {}
