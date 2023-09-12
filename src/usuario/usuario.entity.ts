import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcryptjs'

@Entity({name:'usuario'})
export class UsuarioEntity{
    @PrimaryGeneratedColumn('increment')
   id:number;

   @Column({type:'varchar',length:100, nullable:true})
   name:string;

   @Column({type:'varchar',length:50, nullable:false, unique:true})
   userName:string;

   @Column({type:'varchar',length:50, nullable:false,unique:true})
   email:string;

   @Column({type:'varchar',length:100, nullable:false})
   password:string;

   @ManyToMany(type => RolEntity, rol => rol.usuarios,{eager:true})
   roles:RolEntity[];

   @BeforeInsert()
   @BeforeUpdate()
    async hashPassword(){
        if(!this.password)return;
        this.password = await hash(this.password,10);
    }
}