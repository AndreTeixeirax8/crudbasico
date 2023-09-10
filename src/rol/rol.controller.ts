import { Controller,Get,Post,UsePipes,ValidationPipe,Body } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('rol')
export class RolController {

    constructor(
        private readonly rolSevice: RolService
    ){}

    @Get()
    getAll(){
        return this.rolSevice.getall();
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post()
    create(@Body() dto:CreateRolDto){
        return this.rolSevice.create(dto)
    }


}
