import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioPersonal } from './dto/create-usuario-personal.dto';
import { UpdateUsuarioPersonalDto } from './dto/update-usuario-personal.dto';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('crear-personal')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Crear usuario personal',
    description:
      'Esta API permite crear un usuario personal(recolector) mediante los parametros:{"nombre_completo":"string", "apellido_paterno":"string", "apellido_paterno":"string", "apellido_materno":"string","fecha_nacimiento":"string", "direccion":"string", "telefono":"string", "tipo_carnet":"string","carnet_identidad":"string" ,"genero":"string", "imagen":"string", "correo":"string", "nombre_usuario":"string", "contrasena":"string"}. SP: sp_admin_crear_usuario_personal()',
  })
  crearusuariopersonal(
    @Body() crearUsuarioPersonal:CreateUsuarioPersonal
  ){
    return this.usuarioService.crearUsuarioPersonal(crearUsuarioPersonal);
  }

  @Patch('actualizar-personal/:id_usuario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Actualizar usuario personal',
    description:
      'Esta API permite actualizar el usuario personal(recolector) mediante los parametros:{"id_usuario":"number", "nombre_completo":"string", "apellido_paterno":"string", "apellido_paterno":"string", "apellido_materno":"string","fecha_nacimiento":"string", "direccion":"string", "telefono":"string", "tipo_carnet":"string","carnet_identidad":"string" ,"genero":"string", "imagen":"string", "correo":"string", "nombre_usuario":"string", "contrasena":"string"}. SP: sp_admin_actualizar_personal()',
  })
  ActualizarPersonal(
    @Param('id_usuario') id_usuario: number,
    @Body() updateUsuarioPersonalDto: UpdateUsuarioPersonalDto
  ){
    return this.usuarioService.ActualizarPersonal(id_usuario, updateUsuarioPersonalDto)
  }

  @Patch('dar-baja-usuario/:id_usuario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Dar de baja a usuario',
    description:
      'Esta API permite dar de baja a usuario personal(recolector) mediante el parametro:{"id_usuario":"number"}. SP: sp_admin_dar_baja_usuario_personal()',
  })
  darbajausuario(
    @Param('id_usuario') id_usuario: number 
  ){
    return this.usuarioService.darBajaUsuario(id_usuario)
  }

  // @Post()
  // create(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   return this.usuarioService.create(createUsuarioDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usuarioService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usuarioService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  //   return this.usuarioService.update(+id, updateUsuarioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usuarioService.remove(+id);
  // }
}
