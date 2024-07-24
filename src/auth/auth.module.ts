import { Module, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), MailerModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService, AuthModule]
})
export class AuthModule {}
