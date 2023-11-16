import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Projeto 2 web 2 - Rede social')
    .setDescription(
      'Documetação das rotas do projeto de Luiz Gustavo e Marcelo Favetti.',
    )
    .setVersion('1.0')
    .addTag('Rotas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
