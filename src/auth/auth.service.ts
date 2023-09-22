import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { AuthRepository } from './auth.repository';
import { NovoUsuarioDto } from './dto/novo-usuario.dto';
import { RolName } from 'src/rol/rol.enum';
import { LoginUsuarioDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository:RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository:AuthRepository,
        private readonly jwtService: JwtService,
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


    async login(dto:LoginUsuarioDto): Promise<any>{
        const {userName} = dto;
        const usuario = await this.authRepository.findOne({
            where:[{
                userName:userName
            },{email:userName}]
        })
        if(!usuario) return new UnauthorizedException({message:'usuario inexistente'})
        const passwordOk = await compare(dto.password,usuario.password)
        if(!passwordOk) return new UnauthorizedException({message:'senha errada'})

        const payload: PayloadInterface ={
            id:usuario.id,
            userName:usuario.userName,
            email:usuario.email,
            roles: usuario.roles.map(rol => rol.rolName as RolName)
        }
        const token =  await this.jwtService.sign(payload)
        return {token};
    }

    async refresh(dto:TokenDto): Promise<any>
     {
           const usuario =await this.jwtService.decode(dto.token)
           const payload: PayloadInterface = {
                id: usuario[`id`],
                userName: usuario[`userName`],
                email: usuario[`email`],
                roles: usuario [`roles`]
           } 
           const token =  await this.jwtService.sign(payload)
           return {token};     
      }
}
