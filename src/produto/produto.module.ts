import { Module } from '@nestjs/common';
import { ProductoService } from './produto.service';
import { ProductoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './entities/produto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductoEntity])],
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProdutoModule {}
