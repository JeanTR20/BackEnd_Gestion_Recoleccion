import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf'
import fastifyCsrf from '@fastify/csrf-protection'
import * as moment from 'moment-timezone';

async function bootstrap() {

  // Configuración de la zona horaria por defecto para moment
  moment.tz.setDefault('America/Lima');
  
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  //Validacion Flobal
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Configuracion de Swagger
  const config = new DocumentBuilder()
    .setTitle('Gestion de recoleccion de basura')
    .setDescription('Aqui el listado de las apis')
    .setVersion('1.0')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    // allowedHeaders: 'Content-Type, Authorization'
    // allowedHeaders: ['Authorization', 'Content-Type']
  });
  // app.use(csurf());

  // await app.register(fastifyCsrf);
  
  //Puerto del servidor
  await app.listen(process.env.PORT_SERVER);
}
bootstrap();
