import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity) private productoRepository:ProductoRepository
    ){}


    async getAll():Promise<ProductoEntity[]>{
        const list =await this.productoRepository.find();

        if(!list.length){
            throw new NotFoundException({message:'Produtos estão vazio'})
        }

        return list
    }


    async findById(id: number): Promise<ProductoEntity>{
        const producto = await this.productoRepository.findOne({where:{id}});

        if(producto ){
            throw new NotFoundException({message:'Produto não localizado '})
        }

        return producto
    }

    async findByNome(name: string): Promise<ProductoEntity>{
        const producto = await this.productoRepository.findOne({where:{name}});

        return producto;
    }

    async create(dto:ProductoDto): Promise<any>{
        const producto =  this.productoRepository.create(dto)
        await this.productoRepository.save(producto);
        return {message:'Produto criado'}

    }

    async update(id:number, dto:ProductoDto): Promise<any>{
        const producto = await this.findById(id);
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
