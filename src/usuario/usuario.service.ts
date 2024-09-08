import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioPersonal } from './dto/create-usuario-personal.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUsuarioPersonalDto } from './dto/update-usuario-personal.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateUsuarioAdministradorDto } from './dto/create-usuario-administrador.dto';

@ApiTags('Usuario')
@Injectable()
export class UsuarioService {

  
  constructor(
    //private readonly jwtService: JwtService,
    @InjectRepository(Usuario) 
    private readonly usuarioRespository: Repository<Usuario>
    ){
  }

  async crearUsuarioAdministrador(crearUsuarioAdministradorDto: CreateUsuarioAdministradorDto){
    try {
      const {
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
        imagen,
        correo, 
        nombre_usuario, 
        contrasena
      } = crearUsuarioAdministradorDto

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
        'call sp_admin_crear_usuario_administrador(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
          imagen,
          correo,
          nombre_usuario,
          contrasenaHashed
        ]
      );
  
      return {
        message: 'se registro exitosamente el usuario del administrador'
      }
    } catch (error) {
      throw new BadRequestException('Error al registrar, ' + error.message)
    }

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

  async actualizarPersonal(id_usuario: number, updateUsuarioPersonalDto: UpdateUsuarioPersonalDto){
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

      // const validarCorreoUsuario = await this.usuarioRespository.query(
      //   'SELECT usuario_carnet_identidad, usuario_correo FROM tbl_usuario WHERE usuario_carnet_identidad = ? OR usuario_correo = ?',
      //   [carnet_identidad, correo]
      // );

      const resultado = await this.usuarioRespository.query(
        'call sp_admin_actualizar_personal(?,?,?,?,?,?,?,?,?,?,?,?)',
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
        ]
      );

      // Verifica si el procedimiento almacenado envió algún tipo de error o mensaje de validación
      if (resultado[0][0].message === 'El dni, teléfono y correo ya existe para otro usuario') {
        throw new BadRequestException('El dni, teléfono y correo ya existe para otro usuario');
      }

      if (resultado[0][0].message === 'El dni ya existe para otro usuario') {
        throw new BadRequestException('El dni ya existe para otro usuario');
      }

      if (resultado[0][0].message === 'El teléfono ya existe para otro usuario') {
        throw new BadRequestException('El teléfono ya existe para otro usuario');
      }
      
      if (resultado[0][0].message === 'El correo ya existe para otro usuario') {
        throw new BadRequestException('El correo ya existe para otro usuario');
      }
      
      return {message: 'Se actualizo el usuario exitosamente'}

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async darBajaUsuario(id_usuario: number){
    try {
      await this.usuarioRespository.query(
        'call sp_admin_dar_baja_cuenta(?)',
        [id_usuario]
      );
      return {message: 'Se dio de baja al usuario exitosamente'}
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }
  
  async activarCuenta(id_usuario: number){
    try {
      await this.usuarioRespository.query(
        'call sp_admin_activar_cuenta(?)',
        [id_usuario]
      );
      return {message: 'Se activo su cuenta exitosamente'}
    } catch (error) {
      throw new BadRequestException('Error, '+ error.message)
    }
  }
}
