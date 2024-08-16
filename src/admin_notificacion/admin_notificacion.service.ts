import { Injectable } from '@nestjs/common';
import { CreateAdminNotificacionDto } from './dto/create-admin_notificacion.dto';
import { UpdateAdminNotificacionDto } from './dto/update-admin_notificacion.dto';

@Injectable()
export class AdminNotificacionService {
  create(createAdminNotificacionDto: CreateAdminNotificacionDto) {
    return 'This action adds a new adminNotificacion';
  }

  findAll() {
    return `This action returns all adminNotificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminNotificacion`;
  }

  update(id: number, updateAdminNotificacionDto: UpdateAdminNotificacionDto) {
    return `This action updates a #${id} adminNotificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminNotificacion`;
  }
}
