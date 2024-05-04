import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReporteIncidenciaService } from './reporte_incidencia.service';
import { CreateReporteIncidenciaDto } from './dto/create-reporte_incidencia.dto';
import { UpdateReporteIncidenciaDto } from './dto/update-reporte_incidencia.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { ListarIncidenciaDto } from './dto/listar-reporte_incidencia.dto';

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
  registrarReporte( 
    @Body() createReporteIncidenciaDto: CreateReporteIncidenciaDto){
    return this.reporteIncidenciaService.registrarReporteIncidencia(createReporteIncidenciaDto)
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
  listarincidencia(
    @Query() listarIncidenciaDto: ListarIncidenciaDto
  ){
    return this.reporteIncidenciaService.listarIncidencia(listarIncidenciaDto)
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
  updateincidencia(
    @Param('id_incidencia') id_incidencia: number,
    @Body() updateReporteIncidenciaDto : UpdateReporteIncidenciaDto
  ){
    return this.reporteIncidenciaService.actualizarEstado(id_incidencia, updateReporteIncidenciaDto)
  }

  // @Post()
  // create(@Body() createReporteIncidenciaDto: CreateReporteIncidenciaDto) {
  //   return this.reporteIncidenciaService.create(createReporteIncidenciaDto);
  // }

  // @Get()
  // findAll() {
  //   return this.reporteIncidenciaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reporteIncidenciaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReporteIncidenciaDto: UpdateReporteIncidenciaDto) {
  //   return this.reporteIncidenciaService.update(+id, updateReporteIncidenciaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reporteIncidenciaService.remove(+id);
  // }
}
