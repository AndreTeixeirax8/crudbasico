import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticiaEntity } from 'src/noticia/entities';
import { NoticiaRepository } from 'src/noticia/repositories';
import { NoticiaDto } from '../dtos';

@Injectable()
export class NoticiaService {
    constructor(
        @InjectRepository(NoticiaEntity)
        private noticiaRepository: NoticiaRepository
    ) {}

    async create(dto: NoticiaDto): Promise<any> {
        this.noticiaRepository.save(dto);
        return { message: 'Noticia criado' };
    }

    //this function del

    async buscaTodos(): Promise<NoticiaEntity[]> {
        const list = await this.noticiaRepository.find();

        if (!list.length) {
            throw new NotFoundException({ message: 'Noticia estão vazio' });
        }

        return list;
    }
}
