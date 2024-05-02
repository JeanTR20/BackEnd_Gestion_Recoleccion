import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import * as webPush from 'web-push';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { title } from 'process';

@Injectable()
export class NotificacionService {
  constructor(

    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>
  ){

    webPush.setVapidDetails(
      'mailto:jeantorresricse@gmail.com', // Un email de contacto para tu servidor
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  async subscribe(subscription: string) {
    console.log('Received subscription:', subscription);
    try {
      return {message: 'subscripcion guardada existosamente'}
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  async enviarNotificaciones() {
    
    const pushSubscription = {
      endpoint: 'https://fcm.googleapis.com/fcm/send/cqsCDYFEWrM:APA91bE7MZKdqEz99wBv7eybTRa6uvHJqkqG92UnRLFD3kcR_ZG1-0gIlW_R5JqbbYw2tzersHpHEJFk6Z32tFDgcvhTyKR6V230cOqm7683773LI84sHxMK-rQd4ZMSk7W12o-DSstj',
      keys: {
        auth: 'Z4waj2xmXlo7bRIgSDxB_g',
        p256dh: 'BIjp3mIidVXNoVcJLHNbD2qLk7ZaVaetwUmiC7bvslclSPLqUyf-RsTpCVMXbR2icLkjYIwttTtFV3w_hjL3Ryo'
      }
    };

   const pushNotificacion = JSON.stringify({
    notification: {
      title: 'Municipalidad distrital de Huancán',
      body: 'Notificación de recojo de residuos sólidos',
      vibrate: [100, 50, 100],
      icon: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2FIcono.jpeg?alt=media&token=20ee6026-8dac-452a-8bd5-c0530083c58e',
      image: '',
      actions: [{
        action: '',
        title: 'Ir a ecoRecoge'
      }]
    }
   });
    return await webPush.sendNotification(pushSubscription, pushNotificacion);
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
