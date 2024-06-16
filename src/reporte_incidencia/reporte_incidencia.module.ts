import { Module } from '@nestjs/common';
import { ReporteIncidenciaService } from './reporte_incidencia.service';
import { ReporteIncidenciaController } from './reporte_incidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteIncidencia } from './entities/reporte_incidencia.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports:[TypeOrmModule.forFeature([ReporteIncidencia]), AuthModule, EventsModule],
  controllers: [ReporteIncidenciaController],
  providers: [ReporteIncidenciaService],
})
export class ReporteIncidenciaModule {}
