import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { RolName } from 'src/rol/rol.enum';
import { NoticiaDto } from 'src/noticia/dtos';
import { NoticiaService } from 'src/noticia/services';

@Controller('noticia')
export class NoticiaController {
    constructor(private readonly noticiaService: NoticiaService) {}

    @RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create(@Body() dto: NoticiaDto) {
        // Se dataPublicacao não estiver presente, atribui a data atual
        if (!dto.dataPublicacao) {
            dto.dataPublicacao = new Date(); // Obtém a data atual em formato ISO 8601
            //  dto.dataPublicacao = new Date().toISOString(); // data em string
        }

        return await this.noticiaService.create(dto);
    }

    @RolDecorator(RolName.ADMIN, RolName.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async buscaTodos() {
        return await this.noticiaService.buscaTodos();
    }
}
