import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('APIs for Portfolio Web')
    .setDescription("for soomin's portfolio-web")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const swaggerOptions = {
    swaggerOptions: {
      timeago: true, // 상대적인 시간 표시 활성화
    },
  };

  SwaggerModule.setup('api-doc', app, document, swaggerOptions);

  await app.listen(3000);
}

bootstrap();
