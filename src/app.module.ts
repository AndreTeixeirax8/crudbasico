import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  DB_DATABASE, 
  DB_HOST, 
  DB_PASSWORD, 
  DB_PORT, 
  DB_USER, 
} from './config/constants';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './produto';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),

  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    useFactory:(configService:ConfigService)=>({
      type:'postgres',//'mysql',
      host:configService.get<string>(DB_HOST),
      port:5432,//3306,//+configService.get<number>(DB_PORT),
      username: configService.get<string>(DB_USER),
      password: configService.get<string>(DB_PASSWORD),
      database:configService.get<string>(DB_DATABASE),
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true,
      logging:true,
    }),
    inject:[ConfigService]
  }),

  ProdutoModule,

  UsuarioModule,

  RolModule,

  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
