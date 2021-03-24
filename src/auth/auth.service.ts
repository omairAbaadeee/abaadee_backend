import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/dto/auth-credential.dto';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/reposatory/user.repository';
import * as bcrypt from "bcrypt";
import { UtilityService } from 'src/utility/utility.service';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { throwError } from 'rxjs';
import { CountryRepository } from 'src/reposatory/country.reposatory';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        
        @InjectRepository(CityRepository)
        private cityrepo:CityRepository,

        @InjectRepository(LocationRepository)
        private locationrepo:LocationRepository,

        @InjectRepository(CountryRepository)
        private countryrepo: CountryRepository,
        
        private jwtService:JwtService,
        private utilityservice:UtilityService
    ){}
    
    
    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{

        var {name,email,password,phone_number,city,country,
            location, is_active,is_verified,created_at,
        }= authCredentialsDto;
        is_active=true;
        is_verified=false;
        created_at=new Date();
   
        
        const user=new User();
        user.name=name;
        user.email=email;
        user.salt=await bcrypt.genSalt();
        user.password=await this.hashpassword(password,user.salt);
        //console.log(user.password);
        user.phone_number=phone_number;
       
        const findcountry = await this.countryrepo
        .createQueryBuilder("country")
        .where("country.country_name = :country_name", { country_name: country })
        .getOne();
        user.country=findcountry;

        const findcity = await this.cityrepo
        .createQueryBuilder("city")
        .where("city.cityname = :cityname", { cityname: city })
        .getOne();
        user.city=findcity;


        const findlocation = await this.locationrepo
        .createQueryBuilder("location")
        .where("location.locationname = :locationname", { locationname: location })
        .getOne();
        user.location=findlocation;
        user.is_active=is_active;
        user.is_verified=is_verified;
        user.created_at=created_at;
     
        
        try {
            
            await this.userRepository.save(user);
            const payload={name};
            const accessToken=await this.jwtService.sign(payload);
            this.utilityservice.sendEmail(email,accessToken);
          } catch (error) {
            console.log(typeof (error.code));
            if (error.code === '23505') {
              throw new ConflictException("Username Already exsist")
            }
            else {
              throw new InternalServerErrorException();
            }
          }
    }
    
    async sigIn(authCredentialsDto:AuthCredentialsDto){
        const username=await this.userRepository.validateUserpassword(authCredentialsDto);
        console.log(username);
        
        if(!username){
            throw new UnauthorizedException("invalid Cridential");
        }
        const payload:JwtPayload={username};
        const accessToken=await this.jwtService.sign(payload);
        return {accessToken};
    }
    async varification(Username:string){
      try{
      var update=await this.userRepository.
      createQueryBuilder()
      .update(User)
      .set({ is_verified:true})
      .where("name = :name", { name:Username})
      .execute();
      return {massage:"Your account is varified"};
      }
      catch{
        return throwError("Error");
      }
    }
  

    
    private async hashpassword(password:string,salt:string):Promise<string>{

        return bcrypt.hash(password,salt);
      }

      //Google
      async googleLogin(req) {
        if (!req.user) {
          return 'No user from google'
        }
        else{
          // console.log(req.user);
          // const user1=new User();
          // user1.name=req.user.name+req.user.lastname;
          // user1.email=req.user.email;
          // user1.created_at=new Date;
          
          // await this.userRepository.save(user1);
        

        return {
          message: 'User Info from Google',
          user: req.user
        }
      }
      }
}
