import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HorarioService } from './horario.service';
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
  async listarhorario(
    @Query() dataListarHorarioDto: DataListarHorarioDto
    ){
    return await this.horarioService.listarHorario(dataListarHorarioDto)
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
  async anadirruta(
    @Body() dataAnadirRutaDto: DataAnadirRutaDto
  ){
    return await this.horarioService.anadirRuta(dataAnadirRutaDto);
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
  async listarruta(){
    return await this.horarioService.listarRuta()
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
  async deleteruta(@Param('id_ruta') id_ruta:number ){
    return await this.horarioService.eliminarRuta(id_ruta)
  }

}
