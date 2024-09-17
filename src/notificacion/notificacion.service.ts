import { BadRequestException, Body, Injectable } from '@nestjs/common';
import * as webPush from 'web-push';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { AuthService } from 'src/auth/auth.service';
import { CronJob } from 'cron';
import { Twilio } from 'twilio';

@Injectable()
export class NotificacionService {

  private cronJobMap = new Map<number, CronJob>();

  // private client: Twilio

  constructor(

    private readonly authService: AuthService,
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
  ){

    webPush.setVapidDetails(
      'mailto:support@ecohuancan.com', // Un email de contacto para tu servidor
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );

    // this.client = new Twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN,
    // )
  }

  async programarNotificacion(token: string, suscripcion: any, dia:string, hora: string){

    if(!token){
      throw new BadRequestException('Necesitas iniciar sesión para realizar esta acción backend')
    }

    const id_usuario = await this.authService.obtenerTokenUsuario(token);

    if (!dia || !hora) {
      throw new BadRequestException('Faltan campos requeridos');
    }

    // console.log('suscripcion:', suscripcion);

    await this.notificacionRepository.query(
      'call sp_registrar_programacion_notificacion(?,?,?)',
      [hora, dia, id_usuario]
    );

    const [programar] = await this.notificacionRepository.query(
      'call sp_obtener_programacion_notificacion(?)', [id_usuario]
    );
    
    const [hour, minute] = programar[0].programar_hora.split(':').map(num => parseInt(num, 10));

    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    const crontime = `${minute} ${hour} * * ${this.getDiaSemana(programar[0].programar_dia)}`;
    // console.log(`Scheduling job with crontime: ${crontime}`);

    const job = new CronJob(crontime, async () =>{

      const pushNotificacion = JSON.stringify({
        notification: {
          title: 'Municipalidad distrital de Huancán',
          body: `!Hola! El camion de basurá hoy a las ${formattedHour}:${formattedMinute}. !No olvides sacar la basura!`,
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
        // console.log('Notification sent:', response);
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

    if(!token){
      throw new BadRequestException('El token no encontrado para esta operación.')
    }

    try {

      const id_usuario = await this.authService.obtenerTokenUsuario(token);

      if (!id_usuario) {
        throw new BadRequestException('No se pudo obtener un ID de usuario válido con el token proporcionado.');
      }

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

  async addSuscripcion(subscripcion: any){
    try {
      // this.subscriptions.push(subscripcion);
      const {id_usuario, subscripcion: {endpoint, keys:{p256dh, auth }}} = subscripcion
      await this.notificacionRepository.query(
        'call sp_agregar_suscripcion(?,?,?,?)',
        [endpoint, p256dh, auth, id_usuario]
      )
    } catch (error) {
      throw new BadRequestException('Error al obtener dato de suscripcion, ', error.message)
    }
  }

  //esta funcion obtiene la suscripciones del residentes y recolectores por id
  async getSubscriptionByUserId(userId: number) {
    try {
      const [subscriptions] = await this.notificacionRepository.query(
        'call sp_obtener_suscripcion_by_id_residente_recolector(?)',
        [userId]
      )
  
      if(!subscriptions.length){
        return []
      }
  
      return subscriptions.map(subscription => ({
        endpoint: subscription.suscripcion_endpoint,
        expirationTime: null,
        keys: {
          p256dh: subscription.suscripcion_p256dh,
          auth: subscription.suscripcion_auth
        }
      }));
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  async deleteSuscripcion(endpoint: string){
    try {
      await this.notificacionRepository.query(
        'DELETE FROM tbl_suscripcion WHERE suscripcion_endpoint = ?',
        [endpoint]
      )
    } catch (error) {
      throw new Error('Error no se puede eliminar la suscripcion invalida');
    }
  }

  //esta funcion obtiene todas la suscripciones del residentes y recolectores
  async getAllSuscripcionesResidenteRecolector(){
    try {
      const [suscripciones] = await this.notificacionRepository.query(
        'call sp_obtener_suscripcion_residente_recolector()'
      );

      if(!suscripciones.length){
        return []
      }

      return suscripciones.map(suscripcion => ({
        endpoint: suscripcion.suscripcion_endpoint,
        expirationTime: null,
        keys: {
          p256dh: suscripcion.suscripcion_p256dh,
          auth: suscripcion.suscripcion_auth
        }
      }));

    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  async enviarNotificacionToSuscripciones(subscriptions: any[], payload: any){
    for(const subscription of subscriptions){
      try {
        const response = await webPush.sendNotification(subscription, JSON.stringify(payload));
      } catch (error) {
        if(error.statusCode === 410){
          await this.deleteSuscripcion(subscription.endpoint)
        }
      }
    }
  }

  //esta funcion obtiene todas la suscripciones de los usuarios administradores
  async getAllSuscripcionesAdmin(){
    try {
      const [suscripciones] = await this.notificacionRepository.query(
        'call sp_obtener_suscripcion_administrador()',
      );

      if(!suscripciones.length){
        return [];
      }

      return suscripciones.map(suscripcion => ({
        endpoint: suscripcion.suscripcion_endpoint,
        expirationTime: null,
        keys: {
          p256dh: suscripcion.suscripcion_p256dh,
          auth: suscripcion.suscripcion_auth
        }
      }));
      
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

}
