import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoticiaEntity } from "./entities";
import { RolEntity } from "src/rol/rol.entity";
import { NoticiaService } from "./services";
import { NoticiaController } from "./controller";

@Module({
    imports:[TypeOrmModule.forFeature([NoticiaEntity,RolEntity])],
    providers: [NoticiaService],
    controllers: [NoticiaController]
  })
  export class NoticiaModule {}