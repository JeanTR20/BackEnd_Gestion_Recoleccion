import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminResidente } from './entities/admin_residente.entity';
import { Repository } from 'typeorm';
import { ListarAdminResidenteDto } from './dto/listar-admin-residente.dto';

@Injectable()
export class AdminResidenteService {

  constructor(
    @InjectRepository(AdminResidente)
    private readonly adminResidenteRepository: Repository<AdminResidente>
  ){}

  async listarResidente(listarAdminResidenteDto: ListarAdminResidenteDto){
    try {
      const {numero_carnet, nombres_usuario} = listarAdminResidenteDto

      const [residente] = await this.adminResidenteRepository.query(
        'call sp_admin_listar_residente(?,?)',
        [numero_carnet, nombres_usuario]
      )
      return residente;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async eliminarResidente(id_usuario: number){
    try {
      await this.adminResidenteRepository.query(
        'call sp_admin_eliminar_residente(?)',
        [id_usuario]
      );
      return {message: 'Se eliminó exitosamente el usuario residente'}
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
