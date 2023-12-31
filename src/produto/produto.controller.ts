import { Controller,Param,Get,Post,Body,Put,Delete,ParseIntPipe, UsePipes,
     ValidationPipe, UseGuards,UnauthorizedException,Query } from '@nestjs/common';
import { ProductoService } from './produto.service';
import { ProductoDto } from './dto/producto.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetPrincipal } from 'src/decorators/get-principal.decorator';
import { RolesGuard } from 'src/guards/rol.guard';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolName } from 'src/rol/rol.enum';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { ProductoEntity } from './entities';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService:ProductoService){}

  
/*
    @RolDecorator(RolName.ADMIN,RolName.USER)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    async getAll(){
    
        
        return await this.productoService.getAll()
    }*/

    
     @RolDecorator(RolName.ADMIN,RolName.USER)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    async  getAll(@Query()query: PaginateQuery): Promise<Paginated<ProductoEntity>> {
        return this.productoService.getAll(query);
    }

    @RolDecorator(RolName.ADMIN,RolName.USER)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(':id')
    async getOne(@Param('id')id: number){
        return  await this.productoService.findById(id)
    }
    @RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post()
    async create(@Body() dto: ProductoDto){
        return await this.productoService.create(dto)
    }

    @RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    @Put(':id')
    async update(@Param('id')id: number,@Body() dto: ProductoDto){
        return await this.productoService.update(id,dto)
    }

    @RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    async delete(@Param('id')id: number){
         return await this.productoService.delete(id)   
         }
}
