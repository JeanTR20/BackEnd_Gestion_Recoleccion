import { Controller, Post, Body} from '@nestjs/common';
import { AdminNotificacionService } from './admin_notificacion.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificacionPersonalizadaDto } from './dto/notificacion-personalizadas.dto';

@ApiTags('Admin-Notificacion')
@Controller('admin-notificacion')
export class AdminNotificacionController {
  constructor(private readonly adminNotificacionService: AdminNotificacionService) {}

  @Post('enviar-notificacion-personalizada')
  @ApiHeader({
    name:'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'enviar notificacion personalizada',
    description: 'Esta API permite enviar la notificacion personalizada a todos los usuarios residente y recolectores, lo cual es generado por el administrador'
  })
  enviarnotificacionpersonalizada(
    @Body() notificacionPersonalizadaDto: NotificacionPersonalizadaDto,
  ){
    return this.adminNotificacionService.enviarNotificacionPersonalizada(notificacionPersonalizadaDto);
  } 
}
