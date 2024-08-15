import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminHorarioService } from './admin_horario.service';
import { CreateAdminHorarioDto } from './dto/create-admin_horario.dto';
import { UpdateAdminHorarioDto } from './dto/update-admin_horario.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAdminHorarioDto } from './dto/list-admin-horario.dto';

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
      'Esta API permite actualizar un nuevo horario de recoleccion de basura, mediante los parametros:{"id_horario": "number", dia":"string", "hora_inicio":"date", "recorrido":"string", "referencia_punto":"string" , "ruta_id":"string"}. SP: sp_admin_actualizar_horario()',
  })
  actualizarHorario(
    @Param('id_horario') id_horario: number,
    @Body() updateAdminHorarioDto: UpdateAdminHorarioDto,
  ){
    return this.adminHorarioService.actualizarHorario(id_horario, updateAdminHorarioDto);
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
  deletehorario(@Param('id_horario') id_horario: number){
    return this.adminHorarioService.deleteHorario(id_horario);
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
  listarhorario(
    @Query() listAdminHorarioDto: ListAdminHorarioDto
    ){
    return this.adminHorarioService.listarHorario(listAdminHorarioDto)
  }

}
