import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { RolEntity } from 'src/rol/rol.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UsuarioEntity,RolEntity])],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
