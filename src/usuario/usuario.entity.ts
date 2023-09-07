import { RolEntity } from "src/rol/rol.entity";
import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

   @Column({type:'varchar',length:50, nullable:false})
   password:string;

   @ManyToMany(type => RolEntity, rol => rol.usuarios,{eager:true})
   roles:RolEntity[];


}