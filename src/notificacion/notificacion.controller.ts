import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Notificacion')
@Controller('notificacion')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  
  @Post('enviar')
  @ApiHeader({
    name:'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Enviar notificación',
    description: 'Esta API permite envia las notificaciones a los residentes que hayan iniciado sesión, mediante los Parametro: {"token": "number"}, SP:sp_obtener_programacion_notificacion(?)'
  })
  enviarnotificacion(
    @Headers('Authorization') headers: string, 
    @Body() body: any
  ){

    const token = headers.split(' ')[1];
    const {ruta, dia, hora, suscripcion} = body
    return this.notificacionService.programarNotificacion(token, suscripcion, ruta, dia, hora);
  } 

  @Post('cancelar-notificacion/:id_usuario')
  @ApiHeader({
    name:'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Cancelar notificación',
    description: 'Esta API permite cancelar las notificaciones a los residentes que hayan iniciado sesión, mediante los Parametro: {"id_usuario": "number"}'
  })
  cancelarnotificacion(
    @Param('id_usuario') id_usuario: number 
  ){
    return this.notificacionService.cancelarNotificacion(id_usuario);
  }

  @Get('obtener-notificacion/:token')
  @ApiHeader({
    name:'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'obtener datos de notificación',
    description: 'Esta API permite obtener datos de notificación programada de los residentes, mediante los Parametro: {"id_usuario": "number"}'
  })
  obtenernotificacion(@Param('token') token: string){
    return this.notificacionService.obtenerDatoNotificacion(token)
  }

  @Post('subscribe')
  @ApiHeader({
    name:'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'obtener suscribe',
    description: 'Esta API recibe la suscripcion enviada desde el cliente para obtener la suscripcion de la aplicacion web'
  })
  addsuscribe(
    @Body() subscription: any
  ){
    return this.notificacionService.addSuscripcion(subscription);
  } 

}
