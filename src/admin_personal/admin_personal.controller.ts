import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminPersonalService } from './admin_personal.service';
import { CreateAdminPersonalDto } from './dto/create-admin_personal.dto';
import { UpdateAdminPersonalDto } from './dto/update-admin_personal.dto';
import { ListarAdminPersonal } from './dto/listar-admin_personal.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin-personal')
@Controller('admin-personal')
export class AdminPersonalController {
  constructor(private readonly adminPersonalService: AdminPersonalService) {}

  @Get()
  @ApiHeader({
    name: 'Api-Key',
    description: 'Contra de API'
  })
  @ApiOperation({
    summary: 'Listar personal(recolector) - admin',
    description: 'Esta Api permite listar y filtrar los datos de usuario personal(recolector), mediante el Query:{"numero_carnet":"number", {"apellidos_nombres":"string"}}, SP: sp_admin_listar_recolector(?,?) '
  })
  listarrecolecto(
    @Query() listarAdminPersonal: ListarAdminPersonal
  ){
    return this.adminPersonalService.listarRecolector(listarAdminPersonal)
  }
  // @Post()
  // create(@Body() createAdminPersonalDto: CreateAdminPersonalDto) {
  //   return this.adminPersonalService.create(createAdminPersonalDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminPersonalService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminPersonalService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminPersonalDto: UpdateAdminPersonalDto) {
  //   return this.adminPersonalService.update(+id, updateAdminPersonalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminPersonalService.remove(+id);
  // }
}
