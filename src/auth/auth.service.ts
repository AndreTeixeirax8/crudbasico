import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { AuthRepository } from './auth.repository';
import { NovoUsuarioDto } from './dto/novo-usuario.dto';
import { RolName } from 'src/rol/rol.enum';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository:RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository:AuthRepository
    ){}

    async getall(): Promise<UsuarioEntity[]>{
        const usuarios =await this.authRepository.find()
        if(!usuarios.length) throw new NotFoundException({message:"Nao encotrado"})
        return usuarios
    }

    async create(dto:NovoUsuarioDto): Promise<any>{
        const{email}= dto
        const exists =  await this.authRepository.findOne({ where: [{ userName: dto.userName },{email:email}] })
        if(exists) throw new NotFoundException({message:"Já existe"})
        const rolUser = await this.rolRepository.findOne({where:{rolName:RolName.USER}})
        if( !rolUser) throw new InternalServerErrorException({message:"regra não criada"})
        const user=  this.authRepository.create(dto)
        user.roles = [rolUser]
        return await this.authRepository.save(user)

    }

}
