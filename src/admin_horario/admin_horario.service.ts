import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminHorarioDto } from './dto/create-admin_horario.dto';
import { UpdateAdminHorarioDto } from './dto/update-admin_horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminHorario } from './entities/admin_horario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminHorarioService {

  constructor(
    @InjectRepository(AdminHorario) 
    private readonly adminHorarioRepository: Repository<AdminHorario> 
  ){}

  async crearHorario(createAdminHorarioDto: CreateAdminHorarioDto){
    try {
      const {dia, hora_inicio, recorrido, referencia_punto, ruta_id} = createAdminHorarioDto
      
      await this.adminHorarioRepository.query(
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
      await this.adminHorarioRepository.query(
        'Call sp_admin_actualizar_horario(?,?,?,?,?,?)',
        [id_horario, dia, hora_inicio, recorrido, referencia_punto, ruta_id]
      );
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
      return {
        message: 'Se elimino un registro de la tabla horario'
      }
    } catch (error) {
      throw new BadRequestException('Error ', error.message)
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
