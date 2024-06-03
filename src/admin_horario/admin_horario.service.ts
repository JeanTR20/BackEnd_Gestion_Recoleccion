import { BadRequestException, Get, Injectable, Query } from '@nestjs/common';
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
      
      const createhorario = await this.adminHorarioRepository.query(
        'call sp_admin_crear_horario(?,?,?,?,?)', 
        [dia, hora_inicio, recorrido, referencia_punto, ruta_id]
      );

      this.eventsGateway.notificacionDetectarModificacionHorario({ action: 'create', schedule: createhorario, message:`El horario de la ruta n° ${ruta_id} ha sido modificado`});
      return { message: 'se creo existosamente un nuevo horario'}

    } catch (error) {
      throw new BadRequestException('Error, ' + error.message);
    }
  }

  async actualizarHorario(id_horario, updateAdminHorarioDto: UpdateAdminHorarioDto){
    try {
      const {dia, hora_inicio, recorrido, referencia_punto, ruta_id}= updateAdminHorarioDto;
      const updatehorario = await this.adminHorarioRepository.query(
        'Call sp_admin_actualizar_horario(?,?,?,?,?,?)',
        [id_horario, dia, hora_inicio, recorrido, referencia_punto, ruta_id]
      );
      this.eventsGateway.notificacionDetectarModificacionHorario({ action: 'update', schedule: updatehorario, message:`El horario de la ruta n° ${ruta_id} ha sido modificado`});
      return{
        message: 'Se actualizó exitamente'
      }
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  async deleteHorario(id_horario: number){
    try {
      await this.adminHorarioRepository.query(
        'call sp_admin_eliminar_horario(?)', [id_horario]
      );
      this.eventsGateway.notificacionDetectarModificacionHorario({ action: 'delete', scheduleId: id_horario, message:`El horario con el ID: ${id_horario} ha sido eliminado`});
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

  // create(createAdminHorarioDto: CreateAdminHorarioDto) {
  //   return 'This action adds a new adminHorario';
  // }

  // findAll() {
  //   return `This action returns all adminHorario`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} adminHorario`;
  // }

  // update(id: number, updateAdminHorarioDto: UpdateAdminHorarioDto) {
  //   return `This action updates a #${id} adminHorario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} adminHorario`;
  // }
}
