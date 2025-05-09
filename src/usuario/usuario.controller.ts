import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioPersonal } from './dto/create-usuario-personal.dto';
import { UpdateUsuarioPersonalDto } from './dto/update-usuario-personal.dto';
import { CreateUsuarioAdministradorDto } from './dto/create-usuario-administrador.dto';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('crear-administrador')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Crear usuario administrador',
    description:
      'Esta API permite crear un usuario administrador mediante los parametros:{"id_usuario": "number", "nombre_completo":"string", "apellido_paterno":"string", "apellido_paterno":"string", "apellido_materno":"string","fecha_nacimiento":"string", "direccion":"string", "telefono":"string", "tipo_carnet":"string","carnet_identidad":"string" ,"genero":"string", "imagen":"string", "correo":"string", "nombre_usuario":"string", "contrasena":"string"}. SP: sp_admin_crear_usuario_personal()',
  })
  async crearadministrador(
    @Body() crearUsuarioAdministradorDto: CreateUsuarioAdministradorDto
  ){
    return await this.usuarioService.crearUsuarioAdministrador(crearUsuarioAdministradorDto)
  }

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
  async crearusuariopersonal(
    @Body() crearUsuarioPersonal:CreateUsuarioPersonal
  ){
    return await this.usuarioService.crearUsuarioPersonal(crearUsuarioPersonal);
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
  async actualizarPersonal(
    @Param('id_usuario') id_usuario: number,
    @Body() updateUsuarioPersonalDto: UpdateUsuarioPersonalDto
  ){
    return await this.usuarioService.actualizarPersonal(id_usuario, updateUsuarioPersonalDto)
  }

  @Patch('dar-baja-cuenta/:id_usuario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Dar de baja a usuario',
    description:
      'Esta API permite dar de baja a usuario personal(recolector) mediante el parametro:{"id_usuario":"number"}. SP: sp_admin_dar_baja_cuenta()',
  })
  async darbajausuario(
    @Param('id_usuario') id_usuario: number 
  ){
    return await this.usuarioService.darBajaUsuario(id_usuario)
  }

  @Patch('activar-cuenta/:id_usuario')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de Api'
  })
  @ApiOperation({
    summary: 'Activar cuenta de usuario',
    description: 'Esta API permite activar la cuenta del usuario, mediante el parametro: {"id_usuario":"number"}. SP: sp_admin_activar_cuenta()'
  })
  async activarcuenta(
    @Param('id_usuario') id_usuario: number
  ){
    return await this.usuarioService.activarCuenta(id_usuario)
  }
}
