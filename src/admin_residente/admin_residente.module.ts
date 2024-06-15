import { Module } from '@nestjs/common';
import { AdminResidenteService } from './admin_residente.service';
import { AdminResidenteController } from './admin_residente.controller';

@Module({
  controllers: [AdminResidenteController],
  providers: [AdminResidenteService],
})
export class AdminResidenteModule {}
