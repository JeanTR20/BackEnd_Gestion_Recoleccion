import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      const [recolector] = await this.adminPersonalRepository.query(
        'call sp_admin_listar_recolector(?,?,?)',
        [numero_carnet, apellidos_nombres, estado]
        
      );
      return recolector;
    } catch (error) {
      throw new BadRequestException('Error al listar '+ error.message)
    }
  }
}
