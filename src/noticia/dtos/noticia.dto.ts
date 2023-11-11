import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NoticiaDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    conteudo: string;

    @IsOptional()
    @IsDate()
    dataPublicacao: Date;

    @IsNotEmpty()
    @IsString()
    autor: string;

    @IsNotEmpty()
    @IsString()
    imagemCapa: string;
}
