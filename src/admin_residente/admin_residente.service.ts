import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminResidente } from './entities/admin_residente.entity';
import { Repository } from 'typeorm';
import { ListarAdminResidenteDto } from './dto/listar-admin-residente.dto';
import { UpdateAdminResidenteDto } from './dto/update-admin_residente.dto';
import { ListarAdminResidenteFiltradoDto } from './dto/listar-admin-residente-filtrado.dto';

@Injectable()
export class AdminResidenteService {

  constructor(
    @InjectRepository(AdminResidente)
    private readonly adminResidenteRepository: Repository<AdminResidente>
  ){}

  async listarResidente(listarAdminResidenteDto: ListarAdminResidenteDto){
    try {
      const {numero_carnet, nombres_usuario, page, sizePage} = listarAdminResidenteDto;

      const startIndex = (page - 1) * sizePage

      const [residente] = await this.adminResidenteRepository.query(
        'call sp_admin_listar_residente(?,?,?,?)',
        [numero_carnet, nombres_usuario, startIndex, sizePage]
      );
      
      const [totalResult] = await this.adminResidenteRepository.query(
        'call sp_admin_contar_residente(?,?)',
        [numero_carnet, nombres_usuario]
      )

      const totalResidente = totalResult[0].total;

      return {totalResidente, residente}
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async listarResidenteFiltrado(ListarAdminResidenteFiltradoDto: ListarAdminResidenteFiltradoDto){
    try {
      const {numero_carnet, nombres_usuario} = ListarAdminResidenteFiltradoDto;

      const [residente] = await this.adminResidenteRepository.query(
        'call sp_admin_listar_residente_filtrado(?,?)',
        [numero_carnet, nombres_usuario]
      );

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

      const resultado = await this.adminResidenteRepository.query(
        'call sp_admin_actualizar_residente(?,?,?,?)',
        [id_usuario, telefono, carnet_identidad, nombre_usuario ]
      );

        // Verifica si el procedimiento almacenado envió algún tipo de error o mensaje de validación
      if (resultado[0][0].message === 'El dni y teléfono ya existe para otro usuario') {
        throw new BadRequestException('El dni y teléfono ya existe para otro usuario');
      }

      if (resultado[0][0].message === 'El dni ya existe para otro usuario') {
        throw new BadRequestException('El dni ya existe para otro usuario');
      }

      if (resultado[0][0].message === 'El teléfono ya existe para otro usuario') {
        throw new BadRequestException('El teléfono ya existe para otro usuario');
      }

      return {message: 'Se actualizo exitosamente el usuario residente'}

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
