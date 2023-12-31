import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { RolEntity } from 'src/rol/rol.entity';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([UsuarioEntity,RolEntity,AuthRepository]),
  PassportModule.register({
    defaultStrategy:'jwt'
  }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService:ConfigService)=>({
        secret:configService.get(JWT_SECRET),
        signOptions:{
          expiresIn:'15d' //7200 //valor usando no tutorial 7200 testar e trocar por '15d'
        }
      }),
      inject:[ConfigService],
    })
],
  providers: [AuthService,ConfigService,JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
