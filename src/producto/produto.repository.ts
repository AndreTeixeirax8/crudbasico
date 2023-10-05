import { EntityRepository, Repository } from "typeorm";
import { ProductoEntity } from "./entities/produto.entity";

@EntityRepository(ProductoEntity)
export class ProductoRepository extends Repository<ProductoEntity>{

}