import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Horario } from '../horario/entities/horario.entity';
import { isEmail } from 'class-validator';
import { log } from 'util';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  
  constructor(
    // private readonly jwtService: JwtService,
    @InjectRepository(Auth) 
    private readonly authRepository: Repository<Auth>
  ){}

  async login({correo_usuario, contrasena}: LoginAuthDto){
    try {

      await this.authRepository.query(
        'call sp_iniciar_sesion(?,?,@nombre_rol)',
        [correo_usuario, contrasena]
      );

      const [login] = await this.authRepository.query(
        'select @nombre_rol as nombre_rol'
      );

      return login;

    } catch (error) {

      if(error.message.includes('CredencialesInvalidad')){
        throw new BadRequestException('Credenciales incorrectas')
      }else if(error.name === 'Algun tipo de error de conexion'){
        throw new InternalServerErrorException('Error de conexion de base de datos')
      } else if (error.name === 'ErrorDeEjecución') {
        throw new InternalServerErrorException('Error al ejecutar la operación en la base de datos');
      } else {
        throw new InternalServerErrorException('Ocurrió un error desconocido');
      }
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
