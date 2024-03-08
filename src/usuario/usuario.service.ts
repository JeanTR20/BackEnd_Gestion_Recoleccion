import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Usuario')
@Injectable()
export class UsuarioService {

  
  // constructor(
  //   private readonly jwtService: JwtService,
  //   @InjectRepository(Usuario) 
  //   private readonly usuarioRespository: Repository<Usuario>
  //   ){
  // }

  
  // async recuperarContrasena(token: string){
  //   try {
  //     const decoded = await this.jwtService.verifyAsync(token);
  //     const usuario_id = decoded.id_usuario
  //     console.log(decoded)
  //     const [recuperarcontrasena] = await this.authRepository.query(
  //       'call sp_recuperar_contrasena(?)', [usuario_id]
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
