import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserAuhtDto } from './dto/create-user-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Login',
    description:
      'Esta API obtiene los datos del usuario despues del login, mediante los parametros:{"correo": "string", contrasena: "string"}, SP: sp_iniciar_sesion(?,?)',
  })
  login(
    @Body() loginAuthDto: LoginAuthDto
  ){
    return this.authService.login(loginAuthDto)
  }

  @Get(':token')

  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'Validar login',
    description:
      'Esta API obtiene los datos del usuario, mediante los parametros:{"token": "string"}, SP: call sp_validar_login(?)',
  })
  obtenerdatos(@Param('token') token: string){
    return this.authService.obtenerDatos(token)
  }

  @Post('register')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
    summary: 'Crear usuario Residente',
    description:
      'Esta API permite crear el usuario del residente, mediante los parametros:{"nombre_usuario": "string", "correo": "string", contrasena: "string"}, SP: sp_registrar_usuario_residente(?,?,?)',
  })
  crearusuario(
    @Body() createuserAuthDto: CreateUserAuhtDto
  ){
    return this.authService.crearUsuario(createuserAuthDto)
  }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
