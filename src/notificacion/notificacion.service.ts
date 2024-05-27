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

    const id_usuario = await this.authService.obtenerTokenUsuario(token);

    // const [usuario_existente] = await this.notificacionRepository.query(
    //   'SELECT COUNT(*) AS resultado FROM tbl_suscripcion_notificacion WHERE usuario_id = ?',
    //   [id_usuario]
    // );

    // if(usuario_existente.resultado > 0){
    //   throw new BadRequestException('el usuario ya esta registrado con una suscripción')
    // }

    // const {endpoint, keys: {p256dh, auth}} = suscripcion

    // await this.notificacionRepository.query(
    //   'call sp_registrar_suscripcion_notificacion(?,?,?,?)',
    //   [endpoint, p256dh, auth, id_usuario]
    // );

    await this.notificacionRepository.query(
      'call sp_registrar_programacion_notificacion(?,?,?,?)',
      [ruta, hora, dia, id_usuario]
    );

    const [programar] = await this.notificacionRepository.query(
      'call sp_obtener_programacion_notificacion(?)', [id_usuario]
    );

    // console.log(programar[0].programar_hora)
    // console.log(programar[0].programar_dia)

    const [hour, minute] = programar[0].programar_hora.split(':').map(num => parseInt(num, 10));
    const crontime = `${minute} ${hour} * * ${this.getDiaSemana(programar[0].programar_dia)}`;
    console.log(`Scheduling job with crontime: ${crontime}`);

    const job = new CronJob(crontime, async () =>{

      const pushNotificacion = JSON.stringify({
        notification: {
          title: 'Municipalidad distrital de Huancán',
          body: `Recuerda que el camión compactador de residuos sólidos de la ruta n° ${programar[0].programar_ruta} pasara hoy a las ${hour}:${minute} programada, el id: ${id_usuario}`,
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
        console.error('Error sending push notification', error);
        throw new BadRequestException('Error al enviar la notificacion', error.message)
      }
    });

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
    const job = this.cronJobMap.get(id_usuario);
    if(job) {
      job.stop();
      this.cronJobMap.delete(id_usuario);
      console.log(`notificacion para el id_usuario ${id_usuario} ha sido cancelado`);
    }else{
      console.log(`no se encontro Cronjob para el usuario ${id_usuario}`)
    }
  } 
}
