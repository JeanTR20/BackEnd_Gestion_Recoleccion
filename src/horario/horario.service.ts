import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Repository } from 'typeorm';
import { DataListarHorarioDto } from './dto/data-listar-horario.dto';

@Injectable()
export class HorarioService {

  constructor(
    @InjectRepository(Horario) 
    private horarioRepository: Repository<Horario>,
  ){}

  async listarHorario( {ruta, dia}: DataListarHorarioDto){
    try {
      const [horario] = await this.horarioRepository.query(
        'call sp_listar_horario(?,?)', 
        [ruta, dia]
      );
      return horario;
    } catch (error) {
      throw new Error('Error al listar horario')
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
