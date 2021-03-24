import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import {Strategy,ExtractJwt} from 'passport-jwt'
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/reposatory/user.repository';
import { JwtPayload } from './jwt-payload.interface';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(
    @InjectRepository(UserRepository)
    private userRepository:UserRepository,
){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:'topsecret',
    });
}

async validate(payload:JwtPayload):Promise<User>{

    const {username}=payload;
    const finduser = await this.userRepository
    .createQueryBuilder("user")
    .where("user.name = :name", { name: username })
    .getOne();

    if(!finduser){
        throw new UnauthorizedException();
    }

    return finduser;
}
}