import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminHorarioService } from './admin_horario.service';
import { CreateAdminHorarioDto } from './dto/create-admin_horario.dto';
import { UpdateAdminHorarioDto } from './dto/update-admin_horario.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin-Horario')
@Controller('admin-horario')
export class AdminHorarioController {
  constructor(private readonly adminHorarioService: AdminHorarioService) {}


  @Post('crear-horario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Crear Horario',
    description:
      'Esta API permite crear un nuevo horario de recoleccion de basura, mediante los parametros:{"dia":"string", "hora_inicio":"date", "recorrido":"string", "referencia_punto":"string" , "ruta_id":"string"}. SP: sp_admin_crear_horario(?,?,?,?,?)',
  })
  crearhorario(
    @Body() createAdminHorarioDto: CreateAdminHorarioDto
  ){
    return this.adminHorarioService.crearHorario(createAdminHorarioDto)
  }


  @Patch('actualizar-horario/:id_horario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Actualizar horario',
    description:
      'Esta API permite actualizar un nuevo horario de recoleccion de basura, mediante los parametros:{"id_horario": "string", dia":"string", "hora_inicio":"date", "recorrido":"string", "referencia_punto":"string" , "ruta_id":"string"}. SP: sp_admin_actualizar_horario()',
  })
  actualizarHorario(
    @Param('id_horario') id_horario: number,
    @Body() updateAdminHorarioDto: UpdateAdminHorarioDto,
  ){
    return this.adminHorarioService.actualizarHorario(id_horario, updateAdminHorarioDto);
  }

  @Delete('eliminar-horario/:id_horario')
  deletehorario(@Param('id_horario') id_horario: number){
    return this.adminHorarioService.deleteHorario(id_horario);
  }

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
