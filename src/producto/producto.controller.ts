import { Controller,Param,Get,Post,Body,Put,Delete,ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService:ProductoService){}

    @Get()
    async getAll(){
        return await this.productoService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id')id: number){
        return  await this.productoService.findById(id)
    }

    @Post()
    async create(@Body() dto: ProductoDto){
        return await this.productoService.create(dto)
    }

    @Put(':id')
    async update(@Param('id')id: number,@Body() dto: ProductoDto){
        return await this.productoService.update(id,dto)
    }

    @Delete(':id')
    async delete(@Param('id')id: number){
         return await this.productoService.delete(id)   
         }
}
