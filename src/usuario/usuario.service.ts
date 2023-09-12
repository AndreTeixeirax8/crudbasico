import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RolRepository } from 'src/rol/rol.repository';
import { RolEntity } from 'src/rol/rol.entity';
import { RolName } from 'src/rol/rol.enum';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository:RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository:UsuarioRepository
    ){}

    async getall(): Promise<UsuarioEntity[]>{
        const usuarios =await this.usuarioRepository.find()
        if(!usuarios.length) throw new NotFoundException({message:"Nao encotrado"})
        return usuarios
    }

    async create(dto:CreateUsuarioDto): Promise<any>{
        const{email}= dto
        const exists =  await this.usuarioRepository.findOne({ where: [{ userName: dto.userName },{email:email}] })
        if(exists) throw new NotFoundException({message:"Já existe"})
        const rolAdmin = await this.rolRepository.findOne({where:{rolName:RolName.ADMIN}})
        const rolUser = await this.rolRepository.findOne({where:{rolName:RolName.USER}})
        if(!rolAdmin || !rolUser) throw new InternalServerErrorException({message:"regra não criada"})
        const admin =  this.usuarioRepository.create(dto)
        admin.roles = [rolAdmin,rolUser]
        return await this.usuarioRepository.save(admin)

    }
}
