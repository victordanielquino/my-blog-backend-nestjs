import { NestFactory, Reflector } from "@nestjs/core";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from './app.module';
import { userDefault } from "./common/config/user-default";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const logger = new Logger();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se llegan atributos que no estan definidos en el dtos, los ignora y continua
      forbidNonWhitelisted: true, // alerta de atributos que no esta definido en el esquema de los dtos
      transformOptions: { enableImplicitConversion: true }, // convierte string a number en @Query params
    }),
  );

  // INTERCEPTOR:
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('DOCUMENTS OF API BLOG VIRTUAL')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api');

  // habilitar acceso a todos CORS:
  app.enableCors();

  // user default:
  await userDefault();

  //logger.log(`Server is running in port: ${await app.getUrl()}`);
  await app.listen( process.env.PORT || 3000);
}
bootstrap();
