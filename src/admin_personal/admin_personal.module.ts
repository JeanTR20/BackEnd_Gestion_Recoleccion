import { Module } from '@nestjs/common';
import { AdminPersonalService } from './admin_personal.service';
import { AdminPersonalController } from './admin_personal.controller';

@Module({
  controllers: [AdminPersonalController],
  providers: [AdminPersonalService],
})
export class AdminPersonalModule {}
