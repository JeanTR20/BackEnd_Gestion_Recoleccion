import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { HorarioModule } from './horario/horario.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'jeantorresricse@gmail.com',
          pass: 'oxdy dqjc hlxh wnuz'
        }
      },
      defaults: {
        from: '"Muncipalidad Distrital de Huancán" <jeantorresricse@gmail.com>',
      },
    }),
    HorarioModule,
    
    AuthModule,
    
    UsuarioModule,
    //poner todos los modulos del la carpeta creada
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
