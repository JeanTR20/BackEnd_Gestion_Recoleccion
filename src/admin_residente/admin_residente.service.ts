import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminResidente } from './entities/admin_residente.entity';
import { Repository } from 'typeorm';
import { ListarAdminResidenteDto } from './dto/listar-admin-residente.dto';
import { UpdateAdminResidenteDto } from './dto/update-admin_residente.dto';

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

  async editarResidente(id_usuario: number, updateAdminResidenteDto: UpdateAdminResidenteDto){
    try {
      const {carnet_identidad, nombre_usuario, telefono, } = updateAdminResidenteDto
      await this.adminResidenteRepository.query(
        'call sp_admin_actualizar_residente(?,?,?,?)',
        [id_usuario, carnet_identidad, nombre_usuario, telefono]
      );
      return {message: 'Se actualizo exitosamente el usuario residente'}
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
