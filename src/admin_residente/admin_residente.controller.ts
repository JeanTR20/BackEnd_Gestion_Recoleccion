import { Controller, Get, Param, Delete, Query, Body, Patch } from '@nestjs/common';
import { AdminResidenteService } from './admin_residente.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListarAdminResidenteDto } from './dto/listar-admin-residente.dto';
import { UpdateAdminResidenteDto } from './dto/update-admin_residente.dto';
import { ListarAdminResidenteFiltradoDto } from './dto/listar-admin-residente-filtrado.dto';

@ApiTags('Admin-residente')
@Controller('admin-residente')
export class AdminResidenteController {
  constructor(private readonly adminResidenteService: AdminResidenteService) {}

  @Get()
  @ApiHeader({
    name: 'Api-Key',
    description: 'Contra de API'
  })
  @ApiOperation({
    summary: 'Listar residente - admin',
    description: 'Esta Api permite listar y filtrar los residentes, mediante el Query:{"numero_carnet":"number","nombre_usuario":"string"}, SP: sp_admin_listar_residente(?,?) '
  })
  async listarrecolector(
    @Query() listarAdminResidenteDto: ListarAdminResidenteDto
  ){
    return await this.adminResidenteService.listarResidente(listarAdminResidenteDto)
  }

  @Get('residente-filtrado')
  @ApiHeader({
    name: 'Api-Key',
    description: 'Contra de API'
  })
  @ApiOperation({
    summary: 'Listar residente filtrado - admin',
    description: 'Esta Api permite listar y filtrar los residentes, mediante el Query:{"numero_carnet":"number","nombre_usuario":"string"}, SP: sp_admin_listar_residente(?,?) '
  })
  async listarrecolectorfiltrado(
    @Query() listarAdminResidenteFiltradoDto: ListarAdminResidenteFiltradoDto
  ){
    return await this.adminResidenteService.listarResidenteFiltrado(listarAdminResidenteFiltradoDto)
  }

  @Patch('actualizar/:id_usuario')
  @ApiHeader({
    name: 'Api-Key',
    description: 'Contra de API'
  })
  @ApiOperation({
    summary: 'Actualizar residente - admin',
    description: 'Esta Api permite actualizar los residentes, mediante el Query:{"id_usuario":"number", "telefono":"string", "carnet_identidad":"string","nombre_usuario":"string"}, SP: sp_admin_actualizar_residente(?,?,?,?) '
  })
  async editarresidente(
    @Param('id_usuario') id_usuario: number,
    @Body() updateAdminResidenteDto: UpdateAdminResidenteDto,
  ){
    return await this.adminResidenteService.editarResidente(id_usuario, updateAdminResidenteDto)
  }

  @Delete('eliminar-residente/:id_usuario')
  @ApiHeader({
    name: 'Api-Key',
    description: 'Contra de API'
  })
  @ApiOperation({
    summary: 'Eliminar residente - admin',
    description: 'Esta Api permite eliminar la cuenta de los residentes, mediante el Query:{"id_usuario":"number"}, SP: sp_admin_eliminar_residente(?) '
  })
  async eliminarresidente(@Param('id_usuario') id_usuario:number){
    return await this.adminResidenteService.eliminarResidente(id_usuario)
  }
}
