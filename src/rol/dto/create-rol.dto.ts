import { IsEnum } from "class-validator";
import { RolName } from "../rol.enum";

export class CreateRolDto{

    @IsEnum(RolName)
    rolName:RolName

}