import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HorarioService {

  constructor(
    @InjectRepository(Horario) 
    private horarioRepository: Repository<Horario>,
  ){}

  async listarHorario(dia:string){
    try {
      const [horario] = await this.horarioRepository.query(
        'call sp_listar_horario(?)', 
        [dia]
      );
      return horario;
    } catch (error) {
      throw Error('Error al listar horario')
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
