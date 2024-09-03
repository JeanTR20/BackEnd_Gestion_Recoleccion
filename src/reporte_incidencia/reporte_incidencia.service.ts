import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReporteIncidenciaDto } from './dto/create-reporte_incidencia.dto';
import { UpdateReporteIncidenciaDto } from './dto/update-reporte_incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReporteIncidencia } from './entities/reporte_incidencia.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ListarIncidenciaDto } from './dto/listar-reporte_incidencia.dto';
import { ListarMiReporteDto } from './dto/listar-mi-reporte.dto';
import { NotificacionService } from 'src/notificacion/notificacion.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable()
export class ReporteIncidenciaService {

  constructor(
    private readonly authService: AuthService,
    private readonly notificacionService: NotificacionService,
    @InjectRepository(ReporteIncidencia) 
    private readonly reporteIncidenciaRepository: Repository<ReporteIncidencia>
    
  ){}

  async registrarReporteIncidencia(createReporteIncidenciaDto: CreateReporteIncidenciaDto){
    try {
      const {descripcion, direccion, referencia_calle, foto, token_usuario} = createReporteIncidenciaDto

      const id_usuario = await this.authService.obtenerTokenUsuario(token_usuario)

      const [usuario] = await this.reporteIncidenciaRepository.query(
        'SELECT usuario_carnet_identidad FROM tbl_usuario WHERE usuario_id = ?',
        [id_usuario]
      )

      const registroIncidencia = await this.reporteIncidenciaRepository.query(
        'call sp_registrar_incidencia_reporte(?,?,?,?,?)', 
        [descripcion, direccion, referencia_calle, foto, id_usuario ]
      );

      const suscripciones = await this.notificacionService.getAllSuscripcionesAdmin();

      if(suscripciones.length > 0 && suscripciones){
        await this.notificacionService.enviarNotificacionToSuscripciones(suscripciones, {
          notification: {
            title: 'Registro de un reporte de incidencia de residuos solidos',
            body: `Se ha agregado un reporte de incidencia de residuos sólidos realizado por el usuario con el DNI: ${usuario.usuario_carnet_identidad}`,
            vibrate: [100, 50, 100],
            icon: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2FIcono.jpeg?alt=media&token=20ee6026-8dac-452a-8bd5-c0530083c58e',
            badge: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2Ficon-badge.png?alt=media&token=4fbf448a-84cf-47b3-bacb-bbe4b7a2eeba',
            actions: [{
              action: '',
              title: 'Cerrar'
            }]
          }
        })
      }

      return {message: 'Se registro el reporte de incidencia de residuos solido exitosamente'}
    } catch (error) {
      throw new BadRequestException('Erro al registrar, ' + error.message)
    }
  }
  
  async eliminarReporteIncidencia(id_reporte: number){
    try {
      await this.reporteIncidenciaRepository.query(
        'call sp_admin_eliminar_reporte_incidencia(?)', [id_reporte]
      )

      return {
        message: 'Se elimino el reporte de incidencia exitosamente'
      }

    } catch (error) {
      throw new BadRequestException('Error al eliminar', error.message)
    }
  }

  // api para administrador

  async listarIncidencia(listarIncidenciaDto: ListarIncidenciaDto){
    try {
      const {id_rol, direccion, fecha_reporte, estado, page, sizePage} = listarIncidenciaDto;

      const fechaformateado = fecha_reporte? new Date(fecha_reporte).toISOString().split('T')[0]: null;

      const startIndex = (page - 1) * sizePage;

      const [incidencia] = await this.reporteIncidenciaRepository.query(
        'call sp_admin_listar_reporte_incidencia(?,?,?,?,?,?)', 
        [id_rol, direccion, fechaformateado, estado, startIndex, sizePage]
      );
      
      const [totalResult] = await this.reporteIncidenciaRepository.query(
        'call sp_admin_contar_reporte_incidencia(?,?,?,?)', [id_rol, direccion, fechaformateado, estado]
      );

      const totalIncidencia = totalResult[0].total

      return {totalIncidencia, incidencia};
    } catch (error) {
      throw new BadRequestException('Error al listar', error.message)
    }
  }


  async actualizarEstado(id_incidencia: number, {estado}: UpdateReporteIncidenciaDto){
    try {

      const [id_usuario] = await this.reporteIncidenciaRepository.query(
        'SELECT incidencia_fecha_reporte, usuario_id FROM tbl_incidencia_reporte WHERE incidencia_id = ?',
        [id_incidencia]
      )

      const idusuario = id_usuario.usuario_id;
      const fecha_reporte = new Date(id_usuario.incidencia_fecha_reporte);
      const fecha_formateada = format(fecha_reporte, 'PPPP \'a las\' p a', { locale: es });

      const actualizarEstado = await this.reporteIncidenciaRepository.query(
        'call sp_admin_actualizar_estado_incidencia(?,?)', [id_incidencia, estado]
      );

      if( estado === '1'){ 
        const subscriptions = await this.notificacionService.getSubscriptionByUserId(idusuario);
        if(subscriptions.length > 0 && subscriptions){
          await this.notificacionService.enviarNotificacionToSuscripciones(subscriptions, {
            notification: {
              title: 'Reporte de incidencia de residuos solidos atendido',
              body: `Tu reporte de incidencia de residuos sólidos realizado en la fecha de ${fecha_formateada} ha sido atendido.`,
              vibrate: [100, 50, 100],
              icon: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2FIcono.jpeg?alt=media&token=20ee6026-8dac-452a-8bd5-c0530083c58e',
              badge: 'https://firebasestorage.googleapis.com/v0/b/proyectorecoleccionbasura.appspot.com/o/images%2Ficon-badge.png?alt=media&token=4fbf448a-84cf-47b3-bacb-bbe4b7a2eeba',
              actions: [{
                action: '',
                title: 'Cerrar'
              }]
            }
          })
        }
      }
      
      return {
        message: 'Se actualizo la estado de la incidencia exitosamente'
      }
    } catch (error) {
      throw new BadRequestException('Error, ' + error.message)
    }
  }

  async listarMiReporte(listarMiReporteDto: ListarMiReporteDto){
    try {
      const {token_usuario, estado} = listarMiReporteDto;

      const id_usuario = await this.authService.obtenerTokenUsuario(token_usuario)

      const [reporte] = await this.reporteIncidenciaRepository.query(
        'call sp_listar_mi_reporte_incidencia(?,?)', 
        [id_usuario, estado]
      );
      return reporte;

    } catch (error) {
      throw new BadRequestException('Error al listar mi reporte, ' + error.message)
    }
  }

}
