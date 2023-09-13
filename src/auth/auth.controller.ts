import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NovoUsuarioDto } from './dto/novo-usuario.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Get()
    getAll(){
        return this.authService.getall();
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('novo')
    create(@Body() dto:NovoUsuarioDto){
        return this.authService.create(dto)
    }

}
