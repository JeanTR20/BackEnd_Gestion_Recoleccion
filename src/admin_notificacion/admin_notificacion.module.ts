import { Module } from '@nestjs/common';
import { AdminNotificacionService } from './admin_notificacion.service';
import { AdminNotificacionController } from './admin_notificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminNotificacion } from './entities/admin_notificacion.entity';
import { NotificacionModule } from 'src/notificacion/notificacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminNotificacion]), NotificacionModule],
  controllers: [AdminNotificacionController],
  providers: [AdminNotificacionService],
})
export class AdminNotificacionModule {}
