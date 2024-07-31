import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Code, Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserAuhtDto } from './dto/create-user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RecoverAuthDto } from './dto/recover-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EnviarSmsAuthDto } from './dto/enviar-sms-auth.dto';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';
import { VerificarCodigoAuthDto } from './dto/verificar-codigo-auth.dto';


@Injectable()
export class AuthService {  
  
  private twilioClient;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Auth) 
    private readonly authRepository: Repository<Auth>,
    private readonly mailerService: MailerService,
  ){
    this.twilioClient = Twilio(
      this.configService.get('TWILIO_ACCOUNT_SID'),
      this.configService.get('TWILIO_AUTH_TOKEN')
    );
  }

  async login({dni_usuario, contrasena}: LoginAuthDto){
    try {

      const [usuario] = await this.authRepository.query(
        'SELECT usuario_contrasena, usuario_nombre_completo, usuario_apellido_paterno, usuario_apellido_materno, usuario_nombre_usuario, usuario_correo, usuario_id, usuario_estado FROM tbl_usuario WHERE usuario_carnet_identidad = ? AND usuario_estado = 1',
        [dni_usuario]
      );

      if(!usuario){
        throw new UnauthorizedException('No es valido el DNI o no está registrado')
      }

      const passHash = usuario.usuario_contrasena;

      //verifica si la contrasena es correcta

      const isValidPassHash = await bcryptjs.compare(contrasena, passHash)

      if(isValidPassHash){
        const [user] = await this.authRepository.query(
          'call sp_iniciar_sesion(?,?)',
          [dni_usuario, passHash]
        );
  
        const payload = { 
          id_usuario: usuario.usuario_id,
          rol_nombre: user[0].rol_nombre
        };

        const token = await this.jwtService.signAsync(payload);
    
        return {
          user: {
            usuario_id: usuario.usuario_id,
            usuario_nombre_completo: usuario.usuario_nombre_completo,
            usuario_apellido_paterno: usuario.usuario_apellido_paterno,
            usuario_apellido_materno: usuario.usuario_apellido_materno,
            usuario_nombre: usuario.usuario_nombre_usuario,
            usuario_telefono: usuario.usuario_telefono,
            usuario_correo: usuario.usuario_correo,
            usuario_estado: usuario.usuario_estado,
            rol_nombre: user[0].rol_nombre
          },
          token: token
        }
      }else{
        throw new UnauthorizedException('No es valido la contraseña');
      }

    } catch (error) {

      if(error.message.includes('CredencialesInvalidad')){
        throw new BadRequestException('Credenciales incorrectas')
      }else if(error.name === 'Algun tipo de error de conexion'){
        throw new InternalServerErrorException('Error de conexion de base de datos')
      } else if (error.name === 'ErrorDeEjecución') {
        throw new InternalServerErrorException('Error al ejecutar la operación en la base de datos');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
  
  async obtenerTokenUsuario(token: string): Promise<number>{
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const usuario_id  = decoded.id_usuario;
      
      return usuario_id;

    } catch (error) {
      throw new UnauthorizedException('token no valido')
    }
  }

  async obtenerDatos(token: string){
    
    const idUsuario = await this.obtenerTokenUsuario(token)
    const [datos] = await this.authRepository.query(
      'CALL sp_validar_login(?)', [idUsuario]
      
    );
    return {
      user: {
        usuario_id: datos[0].usuario_id,
        usuario_nombre: datos[0].usuario_nombre_usuario,
        usuario_nombre_completo: datos[0].usuario_nombre_completo,
        usuario_apellido_paterno: datos[0].usuario_apellido_paterno,
        usuario_apellido_materno: datos[0].usuario_apellido_materno,
        usuario_telefono: datos[0].usuario_telefono,
        usuario_correo: datos[0].usuario_correo,
        usuario_estado: datos[0].usuario_estado,
        rol_nombre: datos[0].rol_nombre
      },
      token: token
    }
  }

  async crearUsuario(createUserAuhtDto: CreateUserAuhtDto){
    try {

      const {dni, telefono, nombre_usuario} = createUserAuhtDto;

      const validarDniUsuario = await this.authRepository.query(
        'SELECT usuario_carnet_identidad, usuario_telefono FROM tbl_usuario WHERE usuario_carnet_identidad = ? OR usuario_telefono = ? ',
        [dni, telefono]
      )
      
      if(validarDniUsuario.some(usuario => usuario.usuario_carnet_identidad === dni && usuario.usuario_telefono === telefono)){
        throw new BadRequestException('el dni y número celular ya existe')
      }

      if(validarDniUsuario.some(usuario => usuario.usuario_carnet_identidad === dni)){
        throw new BadRequestException('el dni ya existe')
      }

      if(validarDniUsuario.some(usuario => usuario.usuario_telefono === telefono )){
        throw new BadRequestException('el número de celular ya existe')
      }

      const passHashed = await bcryptjs.hash(createUserAuhtDto.contrasena, 10);

      await this.authRepository.query(
        'call sp_registrar_usuario_residente(?,?,?,?,@id_usuario)', [
          dni,
          nombre_usuario,
          telefono,
          passHashed,
        ]
      );
  
      const [id_usuario] = await this.authRepository.query(
        'SELECT @id_usuario as id_usuario'
      );
  
      return id_usuario;

    } catch (error) {
      throw new BadRequestException('Error al registrar el usuario, ' + error.message)
    }
  }

  // async envioCorreoRecover(envioCorreoAuthDto: EnvioCorreoAuthDto){

  //   const {correo} = envioCorreoAuthDto
  //   try {
  //     const [user] = await this.authRepository.query(
  //       'SELECT usuario_correo, usuario_id FROM tbl_usuario WHERE usuario_correo = ?',
  //       [correo]
  //     )
      
  //     if(!user){
  //       throw new Error('no existe el correo');
  //     }

  //     const resetToken = this.jwtService.sign({correo}, {expiresIn: '3h'});
  //     const resetLink = `http://localhost:4200/usuario/restablecer-contrasena?token=${resetToken}`

  //     const templatePath = path.join(__dirname, '..', '..', 'src', 'auth', 'correo', 'recoverCorreo.html');
  //     let html = fs.readFileSync(templatePath, 'utf-8');
  //     html = html.replace('{{resetLink}}', resetLink)

  //     await this.mailerService.sendMail({
  //       to: correo,
  //       subject: 'Restablecer contraseña',
  //       html: html,
        
  //     });
  //     return { message : 'Se envió el mensaje de correo correctamente'}

  //   } catch (error) {
  //     throw new InternalServerErrorException('Error al enviar, ' + error.message)
  //   }
  // }

  async enviarCodigoVerificacion(enviarSmsAuthDto: EnviarSmsAuthDto){
    try {
      const {telefono} = enviarSmsAuthDto;

      const [existenumero] = await this.authRepository.query(
        'SELECT usuario_id ,usuario_telefono FROM tbl_usuario WHERE usuario_telefono = ?',
        [telefono]
      )

      if(!existenumero){
        throw new BadRequestException('El número de celular no esta registrado')
      }

      const now = new Date();
      const expiracion = new Date(now.getTime() + 2 * 60000)
      const codigoVerficacion = Math.floor(100000 + Math.random() * 900000).toString();

      await this.authRepository.query(
        'call sp_registrar_codigo_verificacion(?,?,?)',
        [telefono, codigoVerficacion, expiracion]
      )
      
      const mensaje = await this.twilioClient.messages.create({
        body: `Tu código de verificación para EcoRecoge es: ${codigoVerficacion}`,
        to: '+51'+ telefono,
        from: this.configService.get('TWILIO_PHONE_NUMBER')
      });
      // console.log(mensaje.sid)
      return {message: 'Código de verificación enviado'}
    } catch (error) {
      // console.log('Error al enviar SMS:', error);
      throw new BadRequestException('Error al enviar el código de verificación. ' + error.message)
    }
  }

  async verificarCodigo(verificarCodigoAuthDto: VerificarCodigoAuthDto){
    try {
      const {telefono, codigo_verificacion} = verificarCodigoAuthDto;

      console.log(telefono, codigo_verificacion)

      const [result] = await this.authRepository.query(
        'SELECT usuario_verificacion_codigo, usuario_expiracion_codigo FROM tbl_usuario WHERE usuario_telefono = ? AND usuario_verificacion_codigo = ?',
        [telefono, codigo_verificacion]
      )
      
      console.log(result.usuario_expiracion_codigo)

      if(result && new Date(result.usuario_expiracion_codigo)> new Date()){
        return {message: 'Código verificado correctamente'}
      }else{
        throw new BadRequestException('Código incorrecto')
      }

    } catch (error) {
      throw new BadRequestException('Error en la verificación del código, ' + error.message)
    }
  }

  async validadarTokenCorreo(token: string){
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log(decoded)
      return {
        valido: true, 
        correo: decoded.correo
      };

    } catch (error) {
      throw new UnauthorizedException('token no valido o expirado')
    }
  }

  async recoverPassword(recoverAuthDto: RecoverAuthDto){
    try {

      const {telefono, nuevo_password} = recoverAuthDto;

      const user = await this.authRepository.query(
        'SELECT usuario_id FROM tbl_usuario WHERE usuario_telefono = ?',
        [telefono]
      )
      
      if(!user){
        throw new BadRequestException('El usuario no esta registrado')
      }

      const nuevo_passHashed = await bcryptjs.hash(nuevo_password, 10);

      await this.authRepository.query(
        'UPDATE tbl_usuario SET usuario_contrasena = ? WHERE usuario_telefono = ?', 
        [nuevo_passHashed, telefono]
      );
   
      return {message: 'Nueva contraseña actualizada correctanente'}
    } catch (error) {
      throw new UnauthorizedException('Token invalido o expirado')
    }
  }
  
  async obtenerDatosById(id_usuario: string){

    const [datos] = await this.authRepository.query(
      'CALL sp_validar_login(?)', [id_usuario]
    );
    return {
      user: {
        usuario_id: datos[0].usuario_id,
        usuario_nombre: datos[0].usuario_nombre_usuario,
        usuario_correo: datos[0].usuario_correo,
        usuario_estado: datos[0].usuario_estado,
      }
    }
  }


  findAll() {
    return `This action returns all auth`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
  
}
