import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Request, UseGuards } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DataNotificacionDto } from './dto/data-notificacion.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Notificacion')
@Controller('notificacion')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  
  @Post('subscribe')
  @ApiHeader({
    name:'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Registrar suscripción',
    description: 'Esta API permite registrar la suscripción de los residentes, mediante los Parametro: {"subscription": "any"} y Headers: {"Headers":"string"}, SP:sp_registrar_suscripcion_notificacion()'
  })
  subscribe(@Body() subscription: any, @Headers('Authorization') headers: string) {
    const token = headers.split(' ')[1];
    // console.log('token: ', token)
    // console.log(subscription)
    return this.notificacionService.subscribe(subscription, token);
  }

  @Post('enviar')
  @UseGuards(AuthGuard)
  @ApiHeader({
    name:'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Enviar notificación',
    description: 'Esta API permite envia las notificaciones a los residentes suscrito, mediante los Parametro: {"id_usuario": "number"}, SP:sp_obtener_suscripcion_notificacion(?)'
  })
  enviarnotificacion(@Request() req: Request ){
    const user = req['user']
    const id_usuario = user.user.usuario_id
    //console.log('user: ', user)
    //console.log('ID USUARIO: ', id_usuario)
   return this.notificacionService.enviarNotificaciones(id_usuario);
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
