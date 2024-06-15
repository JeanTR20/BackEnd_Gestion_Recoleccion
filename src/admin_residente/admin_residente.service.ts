import { Injectable } from '@nestjs/common';
import { CreateAdminResidenteDto } from './dto/create-admin_residente.dto';
import { UpdateAdminResidenteDto } from './dto/update-admin_residente.dto';

@Injectable()
export class AdminResidenteService {
  create(createAdminResidenteDto: CreateAdminResidenteDto) {
    return 'This action adds a new adminResidente';
  }

  findAll() {
    return `This action returns all adminResidente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminResidente`;
  }

  update(id: number, updateAdminResidenteDto: UpdateAdminResidenteDto) {
    return `This action updates a #${id} adminResidente`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminResidente`;
  }
}
