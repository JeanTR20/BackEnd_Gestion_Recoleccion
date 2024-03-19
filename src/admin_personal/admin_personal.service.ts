import { Injectable } from '@nestjs/common';
import { CreateAdminPersonalDto } from './dto/create-admin_personal.dto';
import { UpdateAdminPersonalDto } from './dto/update-admin_personal.dto';

@Injectable()
export class AdminPersonalService {
  create(createAdminPersonalDto: CreateAdminPersonalDto) {
    return 'This action adds a new adminPersonal';
  }

  findAll() {
    return `This action returns all adminPersonal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminPersonal`;
  }

  update(id: number, updateAdminPersonalDto: UpdateAdminPersonalDto) {
    return `This action updates a #${id} adminPersonal`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminPersonal`;
  }
}
