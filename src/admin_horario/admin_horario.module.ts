import { Module } from '@nestjs/common';
import { AdminHorarioService } from './admin_horario.service';
import { AdminHorarioController } from './admin_horario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminHorario } from './entities/admin_horario.entity';
import { NotificacionModule } from 'src/notificacion/notificacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminHorario]), NotificacionModule],
  controllers: [AdminHorarioController],
  providers: [AdminHorarioService],
})
export class AdminHorarioModule {}
