import {  IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class LoginUsuarioDto{
 
    @IsString()
    @IsNotBlank({message:"o nome não pode estar vazio"})
    userName:string;

    @IsNotBlank({message:"a senha não pode estar vazio"})
    password:string;


}