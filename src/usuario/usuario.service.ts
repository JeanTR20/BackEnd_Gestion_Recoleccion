import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioPersonal } from './dto/create-usuario-personal.dto';
import { dir } from 'console';
import * as bcryptjs from 'bcryptjs';
import { UpdateUsuarioPersonalDto } from './dto/update-usuario-personal.dto';

@ApiTags('Usuario')
@Injectable()
export class UsuarioService {

  
  constructor(
    //private readonly jwtService: JwtService,
    @InjectRepository(Usuario) 
    private readonly usuarioRespository: Repository<Usuario>
    ){
  }


  async crearUsuarioPersonal(createUsuarioPersonal: CreateUsuarioPersonal){
    try {
      const {
        nombre_completo, 
        apellido_paterno, 
        apellido_materno, 
        fecha_nacimiento, 
        direccion, 
        telefono, 
        tipo_carnet, 
        carnet_identidad,
        genero,
        imagen,
        correo, 
        nombre_usuario, 
        contrasena
      } = createUsuarioPersonal

      const validarCorreoUsuario = await this.usuarioRespository.query(
        'SELECT usuario_carnet_identidad, usuario_correo FROM tbl_usuario WHERE usuario_carnet_identidad = ? OR usuario_correo = ?',
        [carnet_identidad, correo]
      )
      
      if(validarCorreoUsuario.some(usuario => usuario.usuario_carnet_identidad === carnet_identidad && usuario.usuario_correo === correo )){
        throw new BadRequestException('El carnet de identidad y el correo ya existe')
      }

      if(validarCorreoUsuario.some(usuario => usuario.usuario_carnet_identidad === carnet_identidad )){
        throw new BadRequestException('El carnet de identidad ya existe')
      }

      if(validarCorreoUsuario.some(usuario => usuario.usuario_correo === correo )){
        throw new BadRequestException('El correo ya existe')
      }


      const contrasenaHashed = await bcryptjs.hash(contrasena, 10)
  
      await this.usuarioRespository.query(
        'call sp_admin_crear_usuario_personal(?,?,?,?,?,?,?,?,?,?,?,?,?,@id_usuario)',
        [
          nombre_completo,
          apellido_paterno, 
          apellido_materno, 
          fecha_nacimiento, 
          direccion, 
          telefono, 
          tipo_carnet, 
          carnet_identidad, 
          genero,
          imagen,
          correo,
          nombre_usuario,
          contrasenaHashed
        ]
      );
  
      return {
        message: 'se registro exitosamente el usuario del personal'
      }
    } catch (error) {
      throw new BadRequestException('Erro al registrar, ' + error.message)
    }

  }

  async ActualizarPersonal(id_usuario: number, updateUsuarioPersonalDto: UpdateUsuarioPersonalDto){
    try {
      const {
        nombre_completo, 
        apellido_paterno, 
        apellido_materno, 
        fecha_nacimiento, 
        direccion,
        telefono,
        tipo_carnet,
        carnet_identidad,
        genero, 
        correo,
        nombre_usuario,
        contrasena
      } = updateUsuarioPersonalDto;

      const validarCorreoUsuario = await this.usuarioRespository.query(
        'SELECT usuario_carnet_identidad, usuario_correo FROM tbl_usuario WHERE usuario_carnet_identidad = ? OR usuario_correo = ?',
        [carnet_identidad, correo]
      );

      if(validarCorreoUsuario.some(usuario => usuario.usuario_carnet_identidad === carnet_identidad && usuario.usuario_correo === correo )){
        throw new BadRequestException('El carnet de identidad y el correo ya existe')
      }

      if(validarCorreoUsuario.some(usuario => usuario.usuario_carnet_identidad === carnet_identidad )){
        throw new BadRequestException('El carnet de identidad ya existe')
      }

      if(validarCorreoUsuario.some(usuario => usuario.usuario_correo === correo )){
        throw new BadRequestException('El correo ya existe')
      }

      await this.usuarioRespository.query(
        'call sp_admin_actualizar_personal(?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [ 
          id_usuario,
          nombre_completo, 
          apellido_paterno, 
          apellido_materno, 
          fecha_nacimiento,
          direccion,
          telefono,
          tipo_carnet,
          carnet_identidad,
          genero,
          correo,
          nombre_usuario,
          contrasena,
        ]
      );

      return {message: 'Se actualizo el usuario exitosamente'}

    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  
  // async recuperarContrasena(token: string){
  //   try {
  //     const decoded = await this.jwtService.verifyAsync(token);
  //     const usuario_id = decoded.id_usuario
  //     console.log(decoded)t6  mn hytna2e  rctn 
  //     const [recuperarcontrasena] = await this.authRepository.query(
  //       'call sp_recuperar_contrasenjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjja(?)', [usuario_id]
  //     );

  //     const passHashed = await bcryptjs.hash( recuperarcontrasena.nueva_contrasena, 10);
   
  //     return recuperarcontrasena;
  //   } catch (error) {
  //     throw new Error('Erro al recuperar contrasena')
  //   }
  // }
  
  // create(createUsuarioDto: CreateUsuarioDto) {
  //   return 'This action adds a new usuario';
  // }

  // findAll() {
  //   return `This action returns all usuario`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuario`;
  // }

  // update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  //   return `This action updates a #${id} usuario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
