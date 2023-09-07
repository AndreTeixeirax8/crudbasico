import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolName } from "./rol.enum";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { type } from "os";

@Entity({name:'rol'})
export class RolEntity{
    @PrimaryGeneratedColumn('increment')
   id:number;

   @Column({type:'varchar',length:100, nullable:false,unique:true})
   rolName:RolName;

   @ManyToMany(type => UsuarioEntity,usuario => usuario.roles)
   @JoinTable({
    name:'usuario_rol',
    joinColumn:{name:'usuario_id'},
    inverseJoinColumn:{name:'rol_id'}
   })
   usuarios:UsuarioEntity[];

  
}