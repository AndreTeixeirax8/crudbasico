import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';

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

}
