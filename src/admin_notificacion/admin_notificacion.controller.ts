import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminNotificacionService } from './admin_notificacion.service';
import { CreateAdminNotificacionDto } from './dto/create-admin_notificacion.dto';
import { UpdateAdminNotificacionDto } from './dto/update-admin_notificacion.dto';

@Controller('admin-notificacion')
export class AdminNotificacionController {
  constructor(private readonly adminNotificacionService: AdminNotificacionService) {}

  @Post()
  create(@Body() createAdminNotificacionDto: CreateAdminNotificacionDto) {
    return this.adminNotificacionService.create(createAdminNotificacionDto);
  }

  @Get()
  findAll() {
    return this.adminNotificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminNotificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminNotificacionDto: UpdateAdminNotificacionDto) {
    return this.adminNotificacionService.update(+id, updateAdminNotificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminNotificacionService.remove(+id);
  }
}
