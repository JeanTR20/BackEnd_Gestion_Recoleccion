import { BadRequestException, Get, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateAdminHorarioDto } from './dto/create-admin_horario.dto';
import { UpdateAdminHorarioDto } from './dto/update-admin_horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminHorario } from './entities/admin_horario.entity';
import { Repository } from 'typeorm';
import { ListAdminHorarioDto } from './dto/list-admin-horario.dto';
import { EventsGateway } from 'src/events/events.gateway';
import { NotificacionService } from 'src/notificacion/notificacion.service';

@Injectable()
export class AdminHorarioService {

  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly notificacionService: NotificacionService,
    @InjectRepository(AdminHorario) 
    private readonly adminHorarioRepository: Repository<AdminHorario>
    
  ){}

  async crearHorario(createAdminHorarioDto: CreateAdminHorarioDto){
    try {
      const {dia, hora_inicio, recorrido, referencia_punto, ruta_id} = createAdminHorarioDto

      let formatTime = hora_inicio.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const createhorario = await this.adminHorarioRepository.query(
        'call sp_admin_crear_horario(?,?,?,?,?)', 
        [dia, hora_inicio, recorrido, referencia_punto, ruta_id]
      );

      const suscripciones = await this.notificacionService.getAllSuscripcionesResidenteRecolector();

      if(suscripciones.length > 0 && suscripciones){
        await this.notificacionService.enviarNotificacionToSuscripciones( suscripciones, {
          notification: {
            title: 'Nuevo horario creado de residuos solidos',
            body: `El nuevo horario creado: RUTA: ${ruta_id}, DIA: ${dia}, HORA DE INICIO: ${formatTime} y RECORRIDO: ${recorrido}.`,
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

      return { message: 'se creo existosamente un nuevo horario'}

    } catch (error) {
      throw new BadRequestException('Error, ' + error.message);
    }
  }

  async actualizarHorario(id_horario, updateAdminHorarioDto: UpdateAdminHorarioDto){
    try {
      const {dia, hora_inicio, recorrido, referencia_punto, ruta_id}= updateAdminHorarioDto;

      const [horarioActual] = await this.adminHorarioRepository.query(
        'SELECT * FROM tbl_horario_punto WHERE horariopunto_id = ?',
        [id_horario]
      );

      if(!horarioActual){
        throw new NotFoundException(`El horario con ID ${id_horario} no existe.`)
      }

       let formattedTime = hora_inicio.toLocaleTimeString('es-PE', {
           hour: '2-digit',
           minute: '2-digit',
           hour12: true
       });

      const updatehorario = await this.adminHorarioRepository.query(
        'Call sp_admin_actualizar_horario(?,?,?,?,?,?)',
        [id_horario, dia, hora_inicio, recorrido, referencia_punto, ruta_id]
      );

      const suscripciones = await this.notificacionService.getAllSuscripcionesResidenteRecolector();

      if(suscripciones.length > 0 && suscripciones){
        await this.notificacionService.enviarNotificacionToSuscripciones( suscripciones, {
          notification: {
            title: 'Actualización de horario de residuos solidos',
            body: `El horario de la ruta: ${horarioActual.ruta_id} del dia ${horarioActual.horariopunto_dia} fue actualizado. Horario actualizado a: RUTA: ${ruta_id}, DIA: ${dia}, HORA DE INICIO: ${formattedTime} y RECORRIDO: ${recorrido}.`,
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

      return{ message: 'Se actualizó exitamente' }
     
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  async deleteHorario(id_horario: number){
    try {

      const [horario] = await this.adminHorarioRepository.query(
        'SELECT * FROM tbl_horario_punto WHERE horariopunto_id = ?',
        [id_horario]
      );

      console.log(horario.horariopunto_hora_inicio)

      const formattedTime = horario.horariopunto_hora_inicio.slice(0, 5);
      console.log(formattedTime)

      await this.adminHorarioRepository.query(
        'call sp_admin_eliminar_horario(?)', [id_horario]
      );

      const suscripciones = await this.notificacionService.getAllSuscripcionesResidenteRecolector();

      if(suscripciones.length > 0 && suscripciones){
        await this.notificacionService.enviarNotificacionToSuscripciones( suscripciones, {
          notification: {
            title: 'Eliminación de un horario de residuos solidos',
            body: `El horario de la ruta ${horario.ruta_id} del dia ${horario.horariopunto_dia}, con la hora de las ${formattedTime} y recorrido por ${horario.horariopunto_recorrido} fue eliminado.`,
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

      return {
        message: 'Se elimino un registro de la tabla horario'
      }

    } catch (error) {
      throw new BadRequestException('Error ', error.message)
    }
  }

  async listarHorario(listAdminHorarioDto: ListAdminHorarioDto){
    try {
      const {id_ruta, dia, recorrido} = listAdminHorarioDto
      const [horario] = await this.adminHorarioRepository.query(
        'call sp_admin_listar_horario(?,?,?)', [id_ruta, dia, recorrido]
      );
      return horario;
    } catch (error) {
      throw new BadRequestException('Error, '+ error.message)
    }
  }
}
