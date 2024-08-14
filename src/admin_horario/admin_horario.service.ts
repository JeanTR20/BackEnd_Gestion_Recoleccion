import { BadRequestException, Get, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateAdminHorarioDto } from './dto/create-admin_horario.dto';
import { UpdateAdminHorarioDto } from './dto/update-admin_horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminHorario } from './entities/admin_horario.entity';
import { Repository } from 'typeorm';
import { ListAdminHorarioDto } from './dto/list-admin-horario.dto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class AdminHorarioService {

  constructor(
    private readonly eventsGateway: EventsGateway,
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

      console.log(horarioActual)

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

      let mensaje = `Detalle del cambio de horario:
  - Ruta: ${ruta_id}
  - Dia: ${dia}
  - Hora de inicio: ${formattedTime}
  - Recorrido: ${recorrido}`;


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

      await this.adminHorarioRepository.query(
        'call sp_admin_eliminar_horario(?)', [id_horario]
      );


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
