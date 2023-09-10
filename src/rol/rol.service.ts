import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolEntity } from './rol.entity';
import { RolRepository } from './rol.repository';
import { CreateRolDto } from './dto/create-rol.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository:RolRepository
    ){}

    async getall(): Promise<RolEntity[]>{
        const roles =await this.rolRepository.find()
        if(!roles.length) throw new NotFoundException({message:"Nao encotrado"})
        return roles
    }

    async create(dto:CreateRolDto):Promise<any>{
    const exists = await this.rolRepository.findOne({ where: { rolName: dto.rolName } });
    if (exists) throw new NotFoundException({message:"Já existe com esse nome"})
   
    return  await this.rolRepository.save(dto)
    }
}
