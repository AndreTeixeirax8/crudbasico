import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'noticia'})
export class NoticiaEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar' })
    titulo:string;

    @Column({ type: 'text' })
    conteudo: string;

    @Column({ type: 'timestamp' })
    dataPublicacao: Date;

    @Column({ type: 'varchar' })
    autor: string;

    @Column({ type: 'varchar' })
    imagemCapa: string;

   // @ManyToMany(type => CategoriaEntity)
   // @JoinTable()
  //  categorias: CategoriaEntity[];

}