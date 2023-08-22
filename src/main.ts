import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =app.get(ConfigService);//porta do servidor nest
  const port = +configService.get<number>(SERVER_PORT)
  await app.listen(port);
  console.log(`Servidor rodando na porta ${await app.getUrl()} ` )
}
bootstrap();

// Projeto crud basico com base no curso do youyube
//https://www.youtube.com/watch?v=tfsa_NyJfrA&list=PL4bT56Uw3S4zIAOX1ddx8oJS6jaD43vZC&index=2
