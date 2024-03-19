import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminHorarioService } from './admin_horario.service';
import { CreateAdminHorarioDto } from './dto/create-admin_horario.dto';
import { UpdateAdminHorarioDto } from './dto/update-admin_horario.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin-Horario')
@Controller('admin-horario')
export class AdminHorarioController {
  constructor(private readonly adminHorarioService: AdminHorarioService) {}

  // @Get()
  // @ApiHeader({
  //   name: 'api-key',
  //   description: 'Contra de API',
  // })
  // @ApiOperation({
  //   summary: 'Listar horario',
  //   description:
  //     'Esta API permite mostrar una lista de los horario de recoleccion y las referencia de los puntos de recoleccion mediante los parametros:{}. SP: sp_listar_horario(?,?)',
  // })
  // listarhorario(){
  //   return this.adminHorarioService.listarhorario();
  // }
  // @Post()
  // create(@Body() createAdminHorarioDto: CreateAdminHorarioDto) {
  //   return this.adminHorarioService.create(createAdminHorarioDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminHorarioService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminHorarioService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminHorarioDto: UpdateAdminHorarioDto) {
  //   return this.adminHorarioService.update(+id, updateAdminHorarioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminHorarioService.remove(+id);
  // }
}
