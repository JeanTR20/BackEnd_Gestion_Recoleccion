import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReporteIncidenciaService } from './reporte_incidencia.service';
import { CreateReporteIncidenciaDto } from './dto/create-reporte_incidencia.dto';
import { UpdateReporteIncidenciaDto } from './dto/update-reporte_incidencia.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListarIncidenciaDto } from './dto/listar-reporte_incidencia.dto';
import { ListAdminHorarioDto } from 'src/admin_horario/dto/list-admin-horario.dto';
import { ListarMiReporteDto } from './dto/listar-mi-reporte.dto';
import { ListarMiReporteByPaginacionDto } from './dto/listar-mi-reporte-by-paginacion.dto';

@ApiTags('Reporte-incidencia')
@Controller('reporte-incidencia')
export class ReporteIncidenciaController {
  constructor(private readonly reporteIncidenciaService: ReporteIncidenciaService) {}

  @Post()
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'Registrar incidencia de residuos',
    description:
      'Esta API permite registrar el reporte de incidencia de los residentes, mediante los Query:{"descripcion": "string", "direccion": "string", "referencia_calle": "string", "fecha_reporte": "date", "foto": "string", "token_usuario": "string"}, SP: call sp_registrar_incidencia_reporte(?,?,?,?,?,?)',
  })
  async registrarReporte( 
    @Body() createReporteIncidenciaDto: CreateReporteIncidenciaDto){
    return await this.reporteIncidenciaService.registrarReporteIncidencia(createReporteIncidenciaDto)
  }

  @Get()
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'Listar incidencia - admin',
    description:
      'Esta API permite listar y filtrar los reporte de los usuario, mediante los parametros:{"id_rol":"number", direccion": "string", "fecha_reporte": "string", "estado": "string"}, SP: call sp_admin_listar_reporte_incidencia(?,?,?,?)',
  })
  async listarincidencia(
    @Query() listarIncidenciaDto: ListarIncidenciaDto
  ){
    return await this.reporteIncidenciaService.listarIncidencia(listarIncidenciaDto)
  }

  @Patch('actualizar-estado/:id_incidencia')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'actualizar estado de incidencia - admin',
    description:
      'Esta API permite actualizar un estado de un reporte, mediante los parametros:{"id_incidencia":"number"} y Body: {"estado": "string"}, SP: call sp_admin_actualizar_estado_incidencia(?,?)',
  })
  async updateincidencia(
    @Param('id_incidencia') id_incidencia: number,
    @Body() updateReporteIncidenciaDto : UpdateReporteIncidenciaDto
  ){
    return await this.reporteIncidenciaService.actualizarEstado(id_incidencia, updateReporteIncidenciaDto)
  }

  @Get('listar-mi-reporte')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'Listar mi reporte',
    description:
      'Esta API permite listar mi reporte de incidencia de residuos solidos, mediante los parametros:{"id_usuario": "number", "id_rol":"string", "estado": "string"}, SP: call sp_admin_listar_reporte_incidencia(?,?,?,?)',
  })
  async listarmireporte(
    @Query() listarMiReporteDto: ListarMiReporteDto
  ){
    return await this.reporteIncidenciaService.listarMiReporte(listarMiReporteDto)
  }

  @Get('listar-mi-reporte-paginacion')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'Listar mi reporte por paginacion',
    description:
      'Esta API permite listar mi reporte de incidencia de residuos solidos, mediante los parametros:{"id_usuario": "number", "id_rol":"string", "estado": "string"}, SP: call sp_admin_listar_reporte_incidencia(?,?,?,?)',
  })
  async listarmireportebypaginacion(
    @Query() listarMiReporteByPaginacionDto: ListarMiReporteByPaginacionDto
  ){
    return await this.reporteIncidenciaService.listarMiReportebyPaginacion(listarMiReporteByPaginacionDto)
  }

  @Delete('eliminar-reporte/:id_reporte')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'eliminar un reporte',
    description:
      'Esta API permite eliminar un reporte de incidencia de residuos solidos, mediante los parametros:{"id_usuario": "number"}, SP: call sp_admin_listar_reporte_incidencia(?,?,?,?)',
  })
  async elimniarreporte(
    @Param('id_reporte') id_reporte: number
  ){
    return await this.reporteIncidenciaService.eliminarReporteIncidencia(id_reporte)
  }
}
