import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminHorarioService } from './admin_horario.service';
import { CreateAdminHorarioDto } from './dto/create-admin_horario.dto';
import { UpdateAdminHorarioDto } from './dto/update-admin_horario.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAdminHorarioDto } from './dto/list-admin-horario.dto';
import { ListAdminFilterHorarioDto } from './dto/list-admin-filter-horario.dto';

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
  async crearhorario(
    @Body() createAdminHorarioDto: CreateAdminHorarioDto
  ){
    return await this.adminHorarioService.crearHorario(createAdminHorarioDto)
  }

  @Patch('actualizar-horario/:id_horario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Actualizar horario',
    description:
      'Esta API permite actualizar un nuevo horario de recoleccion de basura, mediante los parametros:{"id_horario": "number", dia":"string", "hora_inicio":"date", "recorrido":"string", "referencia_punto":"string" , "ruta_id":"string"}. SP: sp_admin_actualizar_horario()',
  })
  async actualizarHorario(
    @Param('id_horario') id_horario: number,
    @Body() updateAdminHorarioDto: UpdateAdminHorarioDto,
  ){
    return await this.adminHorarioService.actualizarHorario(id_horario, updateAdminHorarioDto);
  }

  @Delete('eliminar-horario/:id_horario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Eliminar horario',
    description:
      'Esta API permite eliminar un horario de la lista de horarios, mediante los parametros:{"id_horario": "number"}. SP: sp_admin_eliminar_horario()',
  })
  async deletehorario(@Param('id_horario') id_horario: number){
    return await this.adminHorarioService.deleteHorario(id_horario);
  }

  @Get('')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Listar horario',
    description:
      'Esta API permite mostrar una lista el registro de la tabla de horarios de recolección mediante los parametros:{"ruta":"NumberString"(1 -> ruta 1, 2 -> ruta 2), "dia":"string"}. SP: sp_listar_horario(?,?)',
  })
  async listarhorario(
    @Query() listAdminHorarioDto: ListAdminHorarioDto
    ){
    return await this.adminHorarioService.listarHorario(listAdminHorarioDto)
  }

  @Get('horario-filtro')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Listar horario filtrado admin',
    description:
      'Esta API permite mostrar una lista el registro de la tabla de horarios de recolección mediante los parametros:{"ruta":"NumberString"(1 -> ruta 1, 2 -> ruta 2), "dia":"string"}. SP: sp_listar_horario(?,?)',
  })
  async listarhorariofiltrado(
    @Query() listAdminFilterHorarioDto: ListAdminFilterHorarioDto
    ){
    return await this.adminHorarioService.listarHorarioFiltrado(listAdminFilterHorarioDto)
  }
}
