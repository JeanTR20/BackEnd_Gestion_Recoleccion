import { Controller, Get, Param, Delete, Query, Post, Body } from '@nestjs/common';
import { AdminResidenteService } from './admin_residente.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListarAdminResidenteDto } from './dto/listar-admin-residente.dto';
import { UpdateAdminResidenteDto } from './dto/update-admin_residente.dto';

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
  listarrecolector(
    @Query() listarAdminResidenteDto: ListarAdminResidenteDto
  ){
    return this.adminResidenteService.listarResidente(listarAdminResidenteDto)
  }

  @Post('actualizar/:id_usuario')
  @ApiHeader({
    name: 'Api-Key',
    description: 'Contra de API'
  })
  @ApiOperation({
    summary: 'Actualizar residente - admin',
    description: 'Esta Api permite actualizar los residentes, mediante el Query:{"id_usuario":"number", "telefono":"string", "carnet_identidad":"string","nombre_usuario":"string"}, SP: sp_admin_actualizar_residente(?,?,?,?) '
  })
  editarresidente(
    @Param('id_usuario') id_usuario: number,
    @Body() updateAdminResidenteDto: UpdateAdminResidenteDto,
  ){
    return this.adminResidenteService.editarResidente(id_usuario, updateAdminResidenteDto)
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
  eliminarresidente(@Param('id_usuario') id_usuario:number){
    return this.adminResidenteService.eliminarResidente(id_usuario)
  }
}
