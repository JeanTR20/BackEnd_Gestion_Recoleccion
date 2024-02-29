import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Horario } from '../horario/entities/horario.entity';
import { isEmail, Length } from 'class-validator';
import { log } from 'util';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserAuhtDto } from './dto/create-user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { throwError } from 'rxjs';


@Injectable()
export class AuthService {  
  
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Auth) 
    private readonly authRepository: Repository<Auth>
  ){}

  async login({correo_usuario, contrasena}: LoginAuthDto){
    try {

      const [usuario] = await this.authRepository.query(
        'SELECT usuario_contrasena, usuario_nombre_usuario, usuario_correo, usuario_id, usuario_estado FROM tbl_usuario WHERE usuario_correo = ? OR usuario_nombre_usuario = ?',
        [correo_usuario, correo_usuario]
      );

      if(!usuario){
        throw new UnauthorizedException('No es valido el correo o el nombre de usuario')
      }

      const passHash = usuario.usuario_contrasena;

      //verifica si la contrasena es correcta

      const isValidPassHash = await bcryptjs.compare(contrasena, passHash)

      if(isValidPassHash){
        await this.authRepository.query(
          'call sp_iniciar_sesion(?,?,@nombre_rol)',
          [correo_usuario, passHash]
        );
  
        const payload = { 
          id_residente: usuario.usuario_id, 
        };

        const token = await this.jwtService.signAsync(payload);
        
        const [login] = await this.authRepository.query(
          'select @nombre_rol as nombre_rol'
        );
  
        return {
          user: {
            usuario_id: usuario.usuario_id,
            usuario_nombre: usuario.usuario_nombre_usuario,
            usuario_correo: usuario.usuario_correo,
            usuario_estado: usuario.usuario_estado,
            nombre_rol: login.nombre_rol
          },
          token: token
        }
      }else{
        throw new UnauthorizedException('No es valido la contrasena');
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

  async obtenerTokenResidente(token: string): Promise<number>{
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const residente_id  = decoded.id_residente;
      
      return residente_id;

    } catch (error) {
      throw new UnauthorizedException('token no valido')
    }
  }

  async obtenerDatos(token: string){

    const idtoken = await this.obtenerTokenResidente(token)
    const [datos] = await this.authRepository.query(
      'CALL sp_validar_login(?)', [idtoken]
      
    );
    return {
      usuario_id: datos[0].usuario_id,
      usuario_nombre: datos[0].usuario_nombre_usuario,
      usuario_correo: datos[0].usuario_correo,
      usuario_estado: datos[0].usuario_estado,
      rol_nombre: datos[0].rol_nombre
    }
  }

  async crearUsuario(createUserAuhtDto: CreateUserAuhtDto){
    try {

      const {correo, nombre_usuario} = createUserAuhtDto;

      const validarCorreoUsuario = await this.authRepository.query(
        'SELECT usuario_correo, usuario_nombre_usuario FROM tbl_usuario WHERE usuario_correo = ? OR usuario_nombre_usuario = ?',
        [correo, nombre_usuario]
      )
      
      if(validarCorreoUsuario.some(usuario => usuario.usuario_correo === correo && usuario.usuario_nombre_usuario === nombre_usuario )){
        throw new BadRequestException('El correo y el nombre de usuario ya existe')
      }

      if(validarCorreoUsuario.some(usuario => usuario.usuario_nombre_usuario === nombre_usuario )){
        throw new BadRequestException('El nombre de usuario ya existe')
      }

      if(validarCorreoUsuario.some(usuario => usuario.usuario_correo === correo )){
        throw new BadRequestException('El correo ya existe')
      }

      const passHashed = await bcryptjs.hash(createUserAuhtDto.contrasena, 10);

      await this.authRepository.query(
        'call sp_registrar_usuario_residente(?,?,?,@id_usuario)', [
          createUserAuhtDto.nombre_usuario,
          createUserAuhtDto.correo,
          passHashed,
        ]
      );
  
      const [id_usuario] = await this.authRepository.query(
        'SELECT @id_usuario as id_usuario'
      );
  
      return id_usuario;

    } catch (error) {
      throw new InternalServerErrorException('Error al registrar el usuario, ' + error.message)
    }
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

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
