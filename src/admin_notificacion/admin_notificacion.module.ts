import { Module } from '@nestjs/common';
import { AdminNotificacionService } from './admin_notificacion.service';
import { AdminNotificacionController } from './admin_notificacion.controller';

@Module({
  controllers: [AdminNotificacionController],
  providers: [AdminNotificacionService],
})
export class AdminNotificacionModule {}
