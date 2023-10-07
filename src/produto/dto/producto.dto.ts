import { IsString,IsNumber } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export  class ProductoDto{

   @IsString()
   @IsNotBlank({message:'o nome não pode estar vazio'})
   name?:string;

   @IsNumber()
   price?:number; 
}