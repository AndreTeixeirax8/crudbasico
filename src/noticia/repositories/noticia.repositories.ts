import { EntityRepository, Repository } from "typeorm";
import { NoticiaEntity } from "src/noticia/entities";

@EntityRepository(NoticiaEntity)
export class NoticiaRepository extends Repository<NoticiaEntity>{}