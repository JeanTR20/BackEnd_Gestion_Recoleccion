import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReporteIncidenciaDto } from './dto/create-reporte_incidencia.dto';
import { UpdateReporteIncidenciaDto } from './dto/update-reporte_incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReporteIncidencia } from './entities/reporte_incidencia.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ReporteIncidenciaService {

  constructor(
    private readonly authService: AuthService,
    @InjectRepository(ReporteIncidencia) 
    private readonly reporteIncidenciaRepository: Repository<ReporteIncidencia>
    
  ){}

  async registrarReporteIncidencia(createReporteIncidenciaDto: CreateReporteIncidenciaDto){
    try {
      const {descripcion, direccion, referencia_calle, fecha_reporte, foto, token_usuario} = createReporteIncidenciaDto

      const id_usuario = await this.authService.obtenerTokenUsuario(token_usuario)

      await this.reporteIncidenciaRepository.query(
        'call sp_registrar_incidencia_reporte(?,?,?,?,?,?)', 
        [descripcion, direccion, referencia_calle, fecha_reporte, foto, id_usuario ]
      );
      
      return {message: 'Se registro el reporte de incidencia de residuos solido exitosamente'}
    } catch (error) {
      throw new BadRequestException('Erro al registrar, ' + error.message)
    }
  }

  listarInicdencia(){
    
  }

  // create(createReporteIncidenciaDto: CreateReporteIncidenciaDto) {
  //   return 'This action adds a new reporteIncidencia';
  // }

  // findAll() {
  //   return `This action returns all reporteIncidencia`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} reporteIncidencia`;
  // }

  // update(id: number, updateReporteIncidenciaDto: UpdateReporteIncidenciaDto) {
  //   return `This action updates a #${id} reporteIncidencia`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} reporteIncidencia`;
  // }
}
