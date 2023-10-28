import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class NoticiaDto{

    @IsNotEmpty()
    @IsString()
    titulo:string;

    @IsNotEmpty()
    @IsString()
    conteudo: string;

    @IsNotEmpty()
    @IsDate()
    dataPublicacao: Date;

    @IsNotEmpty()
    @IsString()
    autor: string;

    @IsNotEmpty()
    @IsString()
    imagemCapa: string;
}