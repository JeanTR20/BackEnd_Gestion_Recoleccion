import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Repository } from 'typeorm';
import { DataListarHorarioDto } from './dto/data-listar-horario.dto';
import { DataAnadirRutaDto } from './dto/data-anadir_ruta.dto';

@Injectable()
export class HorarioService {

  constructor(
    @InjectRepository(Horario) 
    private horarioRepository: Repository<Horario>,
  ){}

  async listarHorario( dataListarHorarioDto: DataListarHorarioDto){
    try {
      const {id_ruta, dia, recorrido} = dataListarHorarioDto
      const [horario] = await this.horarioRepository.query(
        'call sp_listar_horario(?,?,?)', 
        [id_ruta, dia, recorrido]
      );
      return horario;
    } catch (error) {
      throw new Error('Error al listar horario, ' + error.message)
    }
  }

  // admin
  async anadirRuta( {ruta_nombre, ruta_descripcion}: DataAnadirRutaDto){
    try {
      await this.horarioRepository.query(
        'call sp_admin_anadir_ruta(?,?)', [ruta_nombre, ruta_descripcion]
      );
      return { message: 'Se registro exitosamente la nueva ruta'}
    } catch (error) {
      throw new BadRequestException('Error al registrar, '+ error.message)
    }
  }

  async eliminarRuta(id_ruta: number){
    try {
      await this.horarioRepository.query(
        'call sp_admin_eliminar_ruta(?)', [id_ruta]
      );
      return { message: 'Se elimino correctamente la ruta'}
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  async listarRuta(){
    try {
      const [listarRuta] = await this.horarioRepository.query(
        'call sp_admin_listar_ruta()',[]
      );
      return listarRuta;
    } catch (error) {
      throw new BadRequestException('Error, '+ error.message)
    }
  }

  // create(createHorarioDto: CreateHorarioDto) {
  //   return 'This action adds a new horario';
  // }

  // findAll() {
  //   return `This action returns all horario`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} horario`;
  // }

  // update(id: number, updateHorarioDto: UpdateHorarioDto) {
  //   return `This action updates a #${id} horario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} horario`;
  // }
}
