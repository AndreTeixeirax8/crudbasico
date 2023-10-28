import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './entities/produto.entity';
import { ProductoRepository } from './produto.repository';
import { ProductoDto } from './dto/producto.dto';
import { MessageDto } from 'src/common/message.dto';
import { FindManyOptions } from 'typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';




@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity) private productoRepository:ProductoRepository
    ){}


    /*
    async getAll():Promise<ProductoEntity[]>{
        const list =await this.productoRepository.find();

        if(!list.length){
            throw new NotFoundException({message:'Produtos estão vazio'})
        }

        return list
    }*/
  
    async getAll(query: PaginateQuery): Promise<Paginated<ProductoEntity>> {
      console.log("função getall")
      return await paginate(query, this.productoRepository, {
        select: [
          'id',
          'name',
          'price'
        ],
        sortableColumns: [
          'name',
        ],
        nullSort: 'last',
        searchableColumns: ['name'],
        defaultSortBy: [['id', 'ASC']],
        defaultLimit: 5,
       filterableColumns: {
          id: [FilterOperator.EQ, FilterOperator.IN],
       },
      });}

  

    async findById(id: number): Promise<ProductoEntity>{
        const producto = await this.productoRepository.findOne({where:{id}});

        if(!producto ){
            throw new NotFoundException({message:'Produto não localizado '})
        }

        return producto
    }

    async findByNome(name: string): Promise<ProductoEntity>{
        const producto = await this.productoRepository.findOne({where:{name}});

        return producto;
    }

    async create(dto:ProductoDto): Promise<any>{
        const exists =await this.findByNome(dto.name)
        if(exists)  throw new BadRequestException({message:'esse nome já existe'})
        this.productoRepository.save(dto);
        return  {message:'Produto criado'}

    }

    async update(id:number, dto:ProductoDto): Promise<any>{
        const producto = await this.findById(id);
        if(!producto) throw new BadRequestException({message:'esse produto não existe'})
        const exists =await this.findByNome(dto.name)
        if(exists && exists.id !== id)  throw new BadRequestException({message:'esse nome já existe'})
        dto.name? producto.name = dto.name :producto.name = producto.name
        dto.price? producto.price = dto.price :producto.price = producto.price
        await this.productoRepository.save(producto);
        return {message:'Produto atualizado'}

    }

    async delete(id:number):Promise <any>{
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return {message:'Produto Apagado'}
    }

}
