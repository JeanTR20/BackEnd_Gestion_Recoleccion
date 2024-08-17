import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminNotificacionDto } from './dto/create-admin_notificacion.dto';
import { UpdateAdminNotificacionDto } from './dto/update-admin_notificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminNotificacion } from './entities/admin_notificacion.entity';
import { Repository } from 'typeorm';
import { NotificacionService } from 'src/notificacion/notificacion.service';
import { NotificacionPersonalizadaDto } from './dto/notificacion-personalizadas.dto';

@Injectable()
export class AdminNotificacionService {

  constructor(
    private readonly notificacionService: NotificacionService,
    @InjectRepository(AdminNotificacion)
    private readonly adminnotificacionRepository: Repository<AdminNotificacion>,
  ){}

  async enviarNotificacionPersonalizada({descripcion}: NotificacionPersonalizadaDto){
    try {

      if(!descripcion || descripcion.length < 10){
        throw new BadRequestException('La descripcion es demasiado corta');
      }

      const suscripciones = await this.notificacionService.getAllSuscripcionesResidenteRecolector();

      if(suscripciones.length > 0 && suscripciones){
        await this.notificacionService.enviarNotificacionToSuscripciones(suscripciones, {
          notification: {
            title: 'Aviso Importante',
            body: `${descripcion}`,
            vibrate: [100, 50, 100],
            icon: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2FIcono.jpeg?alt=media&token=20ee6026-8dac-452a-8bd5-c0530083c58e',
            badge: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2Ficon-badge.png?alt=media&token=4fbf448a-84cf-47b3-bacb-bbe4b7a2eeba',
            actions: [{
              action: '',
              title: 'Cerrar'
            }]
          }
        })
      }
      return { message: 'Se envió la notificación personalizada exitosamente'}
      
    } catch (error) {
      throw new Error('Error, ' + error.message)
    }
  }
}
