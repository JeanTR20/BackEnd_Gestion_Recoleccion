import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReporteIncidenciaService } from './reporte_incidencia.service';
import { CreateReporteIncidenciaDto } from './dto/create-reporte_incidencia.dto';
import { UpdateReporteIncidenciaDto } from './dto/update-reporte_incidencia.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reporte-incidencia')
@Controller('reporte-incidencia')
export class ReporteIncidenciaController {
  constructor(private readonly reporteIncidenciaService: ReporteIncidenciaService) {}

  @Post()
  registrarReporte( 
    @Body() createReporteIncidenciaDto: CreateReporteIncidenciaDto){
    return this.reporteIncidenciaService.registrarReporteIncidencia(createReporteIncidenciaDto)
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
