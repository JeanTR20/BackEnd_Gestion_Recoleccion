import { Module } from '@nestjs/common';
import { ReporteIncidenciaService } from './reporte_incidencia.service';
import { ReporteIncidenciaController } from './reporte_incidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteIncidencia } from './entities/reporte_incidencia.entity';
import { AuthModule } from 'src/auth/auth.module';
import { NotificacionModule } from 'src/notificacion/notificacion.module';

@Module({
  imports:[TypeOrmModule.forFeature([ReporteIncidencia]), AuthModule, NotificacionModule],
  controllers: [ReporteIncidenciaController],
  providers: [ReporteIncidenciaService],
})
export class ReporteIncidenciaModule {}
