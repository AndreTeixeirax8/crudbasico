import { Injectable,UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport'
import { AuthRepository } from "../auth.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from "src/config/constants";
import { PayloadInterface } from "../payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: AuthRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false, //VERIFICAR O QUE É ESSA OPÇÃO
            secretOrKey:configService.get(JWT_SECRET)
        });
    }

    async validate(payload:PayloadInterface){
        const {userName,email} = payload;
        const usuario = await this.authRepository.findOne({
            where:[{
                userName:userName
            },{email:email}]
        })
        if(!usuario) return new UnauthorizedException({message:'dados incorretos'})
        return payload
    }

}