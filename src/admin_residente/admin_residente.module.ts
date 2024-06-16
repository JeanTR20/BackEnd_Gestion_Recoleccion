import { Module } from '@nestjs/common';
import { AdminResidenteService } from './admin_residente.service';
import { AdminResidenteController } from './admin_residente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminResidente } from './entities/admin_residente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminResidente])],
  controllers: [AdminResidenteController],
  providers: [AdminResidenteService],
})
export class AdminResidenteModule {}
