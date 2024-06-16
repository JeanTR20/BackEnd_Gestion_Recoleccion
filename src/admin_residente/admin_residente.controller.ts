import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminResidenteService } from './admin_residente.service';
import { CreateAdminResidenteDto } from './dto/create-admin_residente.dto';
import { UpdateAdminResidenteDto } from './dto/update-admin_residente.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListarAdminResidenteDto } from './dto/listar-admin-residente.dto';

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

  // @Post()
  // create(@Body() createAdminResidenteDto: CreateAdminResidenteDto) {
  //   return this.adminResidenteService.create(createAdminResidenteDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminResidenteService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminResidenteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminResidenteDto: UpdateAdminResidenteDto) {
  //   return this.adminResidenteService.update(+id, updateAdminResidenteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminResidenteService.remove(+id);
  // }
}
