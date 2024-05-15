import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import * as webPush from 'web-push';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { title } from 'process';
import { AuthService } from 'src/auth/auth.service';
import { DataNotificacionDto } from './dto/data-notificacion.dto';

@Injectable()
export class NotificacionService {
  constructor(

    private readonly authService: AuthService,
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,

  ){

    webPush.setVapidDetails(
      'mailto:jeantorresricse@gmail.com', // Un email de contacto para tu servidor
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  async subscribe(subscription: any, token:string) {
    try {
      const id_usuario = await this.authService.obtenerTokenUsuario(token);

      const [usuario_existente] = await this.notificacionRepository.query(
        'SELECT COUNT(*) AS resultado FROM tbl_suscripcion_notificacion WHERE usuario_id = ?',
        [id_usuario]
      );

      if(usuario_existente.resultado > 0){
        throw new BadRequestException('el usuario ya esta registrado con una suscripción')
      }

      const {endpoint, keys: {p256dh, auth}} = subscription

      await this.notificacionRepository.query(
        'call sp_registrar_suscripcion_notificacion(?,?,?,?)',
        [endpoint, p256dh, auth, id_usuario]
      );

      return {message: 'subscripcion guardada existosamente'}

    } catch (error) {
      throw new BadRequestException('`Error al procesar la solicitud, ' + error.message)
    }
  }

  async enviarNotificaciones(id_usuario: number) {
    
    const [suscripcion] = await this.notificacionRepository.query(
      'call sp_obtener_suscripcion_notificacion(?)',
      [id_usuario]
    )

    const pushSubscription = {
      endpoint: suscripcion[0].suscripcion_endpoint,
      keys: {
        p256dh: suscripcion[0].suscripcion_p256dh,
        auth: suscripcion[0].suscripcion_auth
      }
    };

   const pushNotificacion = JSON.stringify({
    notification: {
      title: 'Municipalidad distrital de Huancán',
      body: 'Notificación de recojo de residuos sólidos',
      vibrate: [100, 50, 100],
      icon: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2FIcono.jpeg?alt=media&token=20ee6026-8dac-452a-8bd5-c0530083c58e',
      badge: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2Ficon-badge.png?alt=media&token=4fbf448a-84cf-47b3-bacb-bbe4b7a2eeba',
      actions: [{
        action: '',
        title: 'Cerrar'
      }]
    }
   });
    return await webPush.sendNotification(pushSubscription, pushNotificacion);
  }

  async registrarProgramacionNotif( dataNotificacionDto:DataNotificacionDto, token:string){
    try {
      const id_usuario = await this.authService.obtenerTokenUsuario(token);
  
      const {ruta, hora, dia} = dataNotificacionDto;
      
      await this.notificacionRepository.query(
        'call sp_registrar_programacion_notificacion(?,?,?,?)',
        [ruta, hora, dia, id_usuario]
      );
      return { message: 'Se registro exitosamente la programacion de notificaciones del usuario'}
    } catch (error) {
      throw new BadRequestException('Error, '+ error.message)
    }
  }

  // create(createNotificacionDto: CreateNotificacionDto) {
  //   return 'This action adds a new notificacion';
  // }

  // findAll() {
  //   return `This action returns all notificacion`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} notificacion`;
  // }

  // update(id: number, updateNotificacionDto: UpdateNotificacionDto) {
  //   return `This action updates a #${id} notificacion`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} notificacion`;
  // }
}
