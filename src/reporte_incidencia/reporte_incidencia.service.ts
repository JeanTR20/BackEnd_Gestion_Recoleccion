import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReporteIncidenciaDto } from './dto/create-reporte_incidencia.dto';
import { UpdateReporteIncidenciaDto } from './dto/update-reporte_incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReporteIncidencia } from './entities/reporte_incidencia.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ListarIncidenciaDto } from './dto/listar-reporte_incidencia.dto';
import { UpdateAdminHorarioDto } from 'src/admin_horario/dto/update-admin_horario.dto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class ReporteIncidenciaService {

  constructor(
    private readonly authService: AuthService,
    private readonly eventsGateway: EventsGateway,
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


  
  // api para administrador

  async listarIncidencia(listarIncidenciaDto: ListarIncidenciaDto){
    try {
      const {id_rol, direccion, fecha_reporte, estado} = listarIncidenciaDto;

      const fechaformateado = fecha_reporte? new Date(fecha_reporte).toISOString().split('T')[0]: null;

      const [incidencia] = await this.reporteIncidenciaRepository.query(
        'call sp_admin_listar_reporte_incidencia(?,?,?,?)', 
        [id_rol, direccion, fechaformateado, estado]
      );
      
      return incidencia;
    } catch (error) {
      throw new BadRequestException('Error al listar', error.message)
    }
  }


  async actualizarEstado(id_incidencia: number, {estado}: UpdateReporteIncidenciaDto){
    try {

      const [id_usuario] = await this.reporteIncidenciaRepository.query(
        'SELECT usuario_id FROM tbl_incidencia_reporte WHERE incidencia_id = ?',
        [id_incidencia]
      )

      const actualizarEstado = await this.reporteIncidenciaRepository.query(
        'call sp_admin_actualizar_estado_incidencia(?,?)', [id_incidencia, estado]
      );
      
      this.eventsGateway.notificacionDetectarModificacionHorario({ 
        action: 'update', 
        schedule: actualizarEstado, 
        message: 'Tu reporte de incidencia ha sido culminado',
        userId: id_usuario,
        estado: estado
      });

      return {
        message: 'Se actualizo la estado de la incidencia exitosamente'
      }
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
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
