import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { RolDecorator } from "src/decorators/rol.decorator";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { RolesGuard } from "src/guards/rol.guard";
import { RolName } from "src/rol/rol.enum";
import { NoticiaDto } from "src/noticia/dtos";
import { NoticiaService } from "src/noticia/services";

@Controller('noticia')
export class NoticiaController {

    constructor(private readonly noticiaService:NoticiaService){}

  

    @RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post()
    async create(@Body() dto: NoticiaDto){
        return await this.noticiaService.create(dto)
    }

}