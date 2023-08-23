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

/**ATENÇÃO!!! 
 * AO executar p projeto a  primeira vez pode dar um erro de conexão do mysql 
 * o nome do erro é 
 *  [Nest] 17832  - 22/08/2023, 12:38:03   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
    Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol
    
    para corrigir basta executar o seguinte comando no seu mysql :

    ALTER USER 'seu_usuario'@'seu_host' IDENTIFIED WITH 'mysql_native_password' BY 'sua_senha';

 */


    //PAREI NA AULA 03 EM 18:00