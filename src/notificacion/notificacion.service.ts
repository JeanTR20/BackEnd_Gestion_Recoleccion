import { BadRequestException, Body, Injectable } from '@nestjs/common';
import * as webPush from 'web-push';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { AuthService } from 'src/auth/auth.service';
import { CronJob } from 'cron';

@Injectable()
export class NotificacionService {

  private cronJobMap = new Map<number, CronJob>();

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

  async programarNotificacion(token: string, suscripcion: any, ruta: string, dia:string, hora: string){

    if(!token){
      throw new BadRequestException('Necesitas iniciar sesión para realizar esta acción backend')
    }

    const id_usuario = await this.authService.obtenerTokenUsuario(token);

    if (!ruta || !dia || !hora) {
      throw new BadRequestException('Faltan campos requeridos');
    }

    console.log('suscripcion:', suscripcion);

    await this.notificacionRepository.query(
      'call sp_registrar_programacion_notificacion(?,?,?,?)',
      [ruta, hora, dia, id_usuario]
    );

    const [programar] = await this.notificacionRepository.query(
      'call sp_obtener_programacion_notificacion(?)', [id_usuario]
    );
    
    const [hour, minute] = programar[0].programar_hora.split(':').map(num => parseInt(num, 10));
    const crontime = `${minute} ${hour} * * ${this.getDiaSemana(programar[0].programar_dia)}`;
    // console.log(`Scheduling job with crontime: ${crontime}`);

    const job = new CronJob(crontime, async () =>{

      const pushNotificacion = JSON.stringify({
        notification: {
          title: 'Municipalidad distrital de Huancán',
          body: `Recuerda que el camión compactador de residuos sólidos de la ruta n° ${programar[0].programar_ruta} pasara hoy a las ${hour}:${minute} programada`,
          vibrate: [100, 50, 100],
          icon: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2FIcono.jpeg?alt=media&token=20ee6026-8dac-452a-8bd5-c0530083c58e',
          badge: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2Ficon-badge.png?alt=media&token=4fbf448a-84cf-47b3-bacb-bbe4b7a2eeba',
          actions: [{
            action: '',
            title: 'Cerrar'
          }]
        }
      });

      try {
        const response = await webPush.sendNotification(suscripcion, pushNotificacion)
        console.log('Notification sent:', response);
      } catch (error) {
        // console.error('Error sending push notification', error);
        throw new BadRequestException('Error al enviar la notificacion', error.message)
      }
    }, null, true, 'America/Lima');

    this.cronJobMap.set(id_usuario, job);
    job.start();
  }

  private getDiaSemana(dia: string): number | undefined{
    const diasemana = {
      'Domingo':0,
      'Lunes': 1,
      'Martes': 2,
      'Miércoles': 3,
      'Jueves': 4,
      'Viernes':5,
      'Sábado':6,
      
    };
    return diasemana[dia]
  }

  async obtenerDatoNotificacion(token: string){
    try {
      const id_usuario = await this.authService.obtenerTokenUsuario(token);

      const [datonotificacion] = await this.notificacionRepository.query(
        'call sp_obtener_programacion_notificacion(?)', [id_usuario]
      );
      return datonotificacion
    } catch (error) {
      throw new BadRequestException('Error ,' + error.message)
    }
  }

  async cancelarNotificacion(id_usuario: number){

    const [datonotificacion] = await this.notificacionRepository.query(
      'call sp_obtener_programacion_notificacion(?)', [id_usuario]
    );

    await this.notificacionRepository.query(
      'CALL sp_desactivar_notificacion(?)', [datonotificacion[0].programar_id]
    )
    
    const job = this.cronJobMap.get(id_usuario);
    if(job) {
      job.stop();
      this.cronJobMap.delete(id_usuario);
      // console.log(`notificacion para el id_usuario ${id_usuario} ha sido cancelado`);
    }else{
      // console.log(`no se encontro Cronjob para el usuario ${id_usuario}`)
    }
  } 
}
