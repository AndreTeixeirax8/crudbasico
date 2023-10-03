import {
Body,
Controller,
Get,
Post,
UsePipes,
ValidationPipe,
UseGuards, 
Param} from '@nestjs/common';
import { UsuarioService } from 'src/usuario';
import { CreateUsuarioDto } from 'src/usuario/dtos';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolName } from 'src/rol/rol.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService:UsuarioService){}

    @Get('buscatodos')
    getAll(){
        return this.usuarioService.getall();
    }
    @Get()
    buscaTodosSimples(){
        return this.usuarioService.buscaTodosSimples();
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post()
    create(@Body() dto:CreateUsuarioDto){
        return this.usuarioService.create(dto)
    }

    @RolDecorator(RolName.ADMIN,RolName.USER)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(':id')
    async getOne(@Param('id')id: number){
        return  await this.usuarioService.buscaUmPorId(id)
    }

}
