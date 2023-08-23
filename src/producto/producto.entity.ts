import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'producto'})
export class ProductoEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',nullable:false })
    name:string;

    @Column({type:'float',nullable:false })
    price:number;
}