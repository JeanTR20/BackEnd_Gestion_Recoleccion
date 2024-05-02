import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { ApiTags } from '@nestjs/swagger';
import { DataNotificacionDto } from './dto/data-notificacion.dto';

@ApiTags('Notificacion')
@Controller('notificacion')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  
  @Post('subscribe')
  async subscribe(@Body('subscription') subscription: string) {
    return this.notificacionService.subscribe(subscription);
  }

  @Post('enviar')
  enviarnotificacion(){
   return this.notificacionService.enviarNotificaciones();
  }


  

  // @Post('enviar-notificacion')
  // enviarnotificacion(
  //   @Body() dataNotificacionDto: DataNotificacionDto
  // ){
  //   return this.notificacionService.enviarNotificaciones(dataNotificacionDto)
  // } 

  // @Post()
  // create(@Body() createNotificacionDto: CreateNotificacionDto) {
  //   return this.notificacionService.create(createNotificacionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.notificacionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notificacionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNotificacionDto: UpdateNotificacionDto) {
  //   return this.notificacionService.update(+id, updateNotificacionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notificacionService.remove(+id);
  // }
}
