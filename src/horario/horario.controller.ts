import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DataListarHorarioDto } from './dto/data-listar-horario.dto';
import { DataAnadirRutaDto } from './dto/data-anadir_ruta.dto';

@ApiTags('Horario')
@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get('')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Listar horario',
    description:
      'Esta API permite mostrar una lista de los horario de recoleccion y las referencia de los puntos de recoleccion mediante los parametros:{"ruta":"NumberString"(1 -> ruta 1, 2 -> ruta 2), "dia":"string"}. SP: sp_listar_horario(?,?)',
  })
  listarhorario(
    @Query() dataListarHorarioDto: DataListarHorarioDto
    ){
    return this.horarioService.listarHorario(dataListarHorarioDto)
  }

  
  @Post('anadir-ruta')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Añadir nueva ruta - admin',
    description:
      'Esta API permite añadir una nueva ruta para los horario de recoleccion, mediante los parametros:{"ruta_nombre":"String", "ruta_descripcion":"string"}. SP: sp_admin_anadir_ruta(?,?)',
  })
  anadirruta(
    @Body() dataAnadirRutaDto: DataAnadirRutaDto
  ){
    return this.horarioService.anadirRuta(dataAnadirRutaDto);
  }

  @Get('listar-ruta')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Listar ruta - admin',
    description:
      'Esta API permite listar las rutas del camion recolector, SP: sp_admin_listar_ruta()',
  })
  listarruta(){
    return this.horarioService.listarRuta()
  }

  @Delete('eliminar-ruta/:id_ruta')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'eliminar ruta - admin',
    description:
      'Esta API permite eliminar un registro de ruta del camion recolector, SP: sp_admin_eliminar_ruta()',
  })
  deleteruta(@Param('id_ruta') id_ruta:number ){
    return this.horarioService.eliminarRuta(id_ruta)
  }

  // @Post()
  // create(@Body() createHorarioDto: CreateHorarioDto) {
  //   return this.horarioService.create(createHorarioDto);
  // }

  // @Get()
  // findAll() {
  //   return this.horarioService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.horarioService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
  //   return this.horarioService.update(+id, updateHorarioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.horarioService.remove(+id);
  // }
}
