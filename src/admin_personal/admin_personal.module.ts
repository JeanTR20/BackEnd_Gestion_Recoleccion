import { Module } from '@nestjs/common';
import { AdminPersonalService } from './admin_personal.service';
import { AdminPersonalController } from './admin_personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPersonal } from './entities/admin_personal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPersonal])],
  controllers: [AdminPersonalController],
  providers: [AdminPersonalService],
})
export class AdminPersonalModule {}
