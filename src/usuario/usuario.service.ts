import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepository } from './repositories/usuario.repository';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { RolRepository } from 'src/rol/rol.repository';
import { RolEntity } from 'src/rol/rol.entity';
import { RolName } from 'src/rol/rol.enum';
import { RetornoUsuarioDto } from './dtos/retorno-usuario.dto';

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

    async buscaTodosSimples(): Promise<RetornoUsuarioDto[]> {
        const usuarios = await this.usuarioRepository.find();
    
        if (!usuarios.length) {
          throw new NotFoundException({ message: 'Não encontrado' });
        }
    
        // Mapeie os resultados para o DTO desejado
        const resultadoDto = usuarios.map((usuario) => {
          const retornoUsuarioDto = new RetornoUsuarioDto();
          retornoUsuarioDto.id = usuario.id;
          retornoUsuarioDto.name = usuario.name;
          retornoUsuarioDto.userName = usuario.userName;
          retornoUsuarioDto.email = usuario.email;
          return retornoUsuarioDto;
        });
    
        return resultadoDto;
      }

      async buscaUmPorId(id: number): Promise<UsuarioEntity>{
        const usuario = await this.usuarioRepository.findOne({where:{id}});

        if(!usuario ){
            throw new NotFoundException({message:'Produto não localizado '})
        }

        return usuario
    }
}
