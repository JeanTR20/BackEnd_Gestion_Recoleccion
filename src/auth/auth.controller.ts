import { Controller, Get, Post, Body, Request, Param, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserAuhtDto } from './dto/create-user-auth.dto';
import { RecoverAuthDto } from './dto/recover-auth.dto';
import { AuthGuard } from './guard/auth.guard';
import { EnviarSmsAuthDto } from './dto/enviar-sms-auth.dto';
import { VerificarCodigoAuthDto } from './dto/verificar-codigo-auth.dto';
import { RateLimit } from 'nestjs-rate-limiter';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  // @UseGuards()
  // @Roles(['Administrador', 'Recolector', 'Residente'])
  @ApiBearerAuth('acces-token')
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
  
  @Get('validar-token/:token')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'Validar token',
    description:
      'Esta API obtiene los datos del usuario, mediante los parametros:{"token": "string"}, SP: call sp_validar_login(?)',
  })
  obtenerdatos(@Param('token') token: string) {
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

  @Get('validar-token-correo/:token')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  
  @ApiOperation({
    summary: 'Validar token de correo',
    description:
      'Esta API permite validar si el token de correo es valido o expirado',
  })
  validarCorreo(@Param('token') token: string) {
    return this.authService.validadarTokenCorreo(token)
  }


  // @Post('enviar-correo')
  // @ApiHeader({
  //   name: 'api-key',
  //   description: 'Contra de API',
  // })
  // @ApiOperation({
  //  summary: 'Envio de correo de restablecimiento de contrasena',
  //   description:
  //     'Esta API permite recuperar la contrasena del usuario, mediante los parametros:{"correo": "string"}, SP: sp_recuperar_contrasena(?)',
  // })
  // enviocorreorecover(
  //   @Body() envioCorreoAuthDto: EnvioCorreoAuthDto
  // ){
  //   return this.authService.envioCorreoRecover(envioCorreoAuthDto)
  // }
  
  @Post('enviar-sms')
  @RateLimit({points: 3, duration: 600, errorMessage: 'Demasiados intentos. Por favor, intente nuevamente mas tarde.'})
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
   summary: 'Envio un SMS de restablecimiento de contraseña',
    description:
      'Esta API permite recuperar la contraseña del usuario, mediante los parametros:{"telefono": "string"}, SP: call sp_registrar_codigo_verificacion()',
  })
  enviarsmsrecover(
    @Body() enviarSmsAuthDto: EnviarSmsAuthDto
  ){
    return this.authService.enviarCodigoVerificacion(enviarSmsAuthDto)
  }

  @Post('verificar-codigo')
  @RateLimit({points: 5, duration: 300, errorMessage: 'Demasiados intentos. Por favor, intente nuevamente mas tarde.'})
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
   summary: 'Verificar código enviado por SMS de restablecimiento de contraseña',
    description:
      'Esta API permite verificar el código, mediante los parametros:{"telefono": "string", "codigo: "string"}',
  })
  verficarcodigo(
    @Body() verificarCodigoAuthDto: VerificarCodigoAuthDto
  ){
    return this.authService.verificarCodigo(verificarCodigoAuthDto)
  }

  
  @Post('actualizar-password')
  @ApiHeader({
    name: 'api-key',
    description: 'Contra de API',
  })
  @ApiOperation({
   summary: 'actualizar nueva de contrasena',
    description:
      'Esta API permite acualizar la contrasena del usuario, mediante los query:{"token":"string""correo": "string"}',
  })
  recoverpassword(@Body() recoverAuthDto: RecoverAuthDto){
    return this.authService.recoverPassword(recoverAuthDto)
  }

  // @Get('validar-token')
  // @ApiHeader({
  //   name: 'api-key',
  //   description: 'Contra de API',
  // })
  
  // @ApiOperation({
  //   summary: 'Validar token 2',
  //   description:
  //     'Esta API obtiene los datos del usuario, mediante los parametros:{"token": "string"}, SP: call sp_validar_login(?)',
  // })
  // validarToken(@Request() req: Request) {
  //   const user = req['user']
  //   return this.authService.obtenerDatos(user)
  // }

  // @Post()
  // @ApiHeader({
  //   name: 'api-key',
  //   description: 'Contra de API',
  // })
  // @ApiOperation({
  //   summary: 'Recuperar contrasena',
  //   description:
  //     'Esta API permite recuperar la contrasena del usuario, mediante los parametros:{"id_usuario": "string"}, SP: sp_recuperar_contrasena(?)',
  // })
  // recuperarcontrasena(
  //   @Body() recoverAuthDto: RecoverAuthDto
  // ){
  //   return this.authService.recuperarContrasena(recoverAuthDto.token)
  // }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Get()
  @UseGuards(AuthGuard)
  findAll( @Request() req: Request) {
    const user = req['user'];
    return this.authService.findAll;
  }

  // @Get('pruba/:id')
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
