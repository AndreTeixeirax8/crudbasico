import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CreateUsuarioDto{
    @IsString()
    name:string;

    @IsString()
    @IsNotBlank({message:"o nome não pode estar vazio"})
    userName:string;

    @IsEmail()
    email:string;

    @IsNotBlank({message:"a senha não pode estar vazio"})
    password:string;


}