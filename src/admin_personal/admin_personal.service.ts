import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminPersonalDto } from './dto/create-admin_personal.dto';
import { UpdateAdminPersonalDto } from './dto/update-admin_personal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminHorario } from 'src/admin_horario/entities/admin_horario.entity';
import { AdminPersonal } from './entities/admin_personal.entity';
import { Repository } from 'typeorm';
import { ListarAdminPersonal } from './dto/listar-admin_personal.dto';

@Injectable()
export class AdminPersonalService {

  constructor(
    @InjectRepository(AdminPersonal) 
    private readonly adminPersonalRepository: Repository<AdminPersonal> 
  ){}

  async listarRecolector( listarAdminPersonal:ListarAdminPersonal){
    try {
      const {numero_carnet, apellidos_nombres, estado} = listarAdminPersonal;
      console.log(listarAdminPersonal.estado)
      const [recolector] = await this.adminPersonalRepository.query(
        'call sp_admin_listar_recolector(?,?,?)',
        [numero_carnet, apellidos_nombres, estado]
        
      );
      // console.log(numero_carnet, apellidos_nombres, estado)
      return recolector;
    } catch (error) {
      throw new BadRequestException('error al listar '+ error.message)
    }
  }

  // create(createAdminPersonalDto: CreateAdminPersonalDto) {
  //   return 'This action adds a new adminPersonal';
  // }

  // findAll() {
  //   return `This action returns all adminPersonal`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} adminPersonal`;
  // }

  // update(id: number, updateAdminPersonalDto: UpdateAdminPersonalDto) {
  //   return `This action updates a #${id} adminPersonal`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} adminPersonal`;
  // }
}
