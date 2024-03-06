import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), MailerModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService, AuthModule]
})
export class AuthModule {}
