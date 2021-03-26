import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto, AuthCredentialsMessage } from 'src/dto/auth-credential.dto';
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
import { SigninDto } from 'src/dto/signin.dto';

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
    
    
    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<AuthCredentialsMessage>{

        var {user_name,email,password,phone_number,city,country,
             is_active,is_verified,created_at,
        }= authCredentialsDto;
        is_active=true;
        is_verified=false;
        created_at=new Date();
   
        
        const user=new User();
        user.name=user_name;
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


    
        user.is_active=is_active;
        user.is_verified=is_verified;
        user.created_at=created_at;
     
        
        try {
            
            await this.userRepository.save(user);
           
            const payload={email};
            const accessToken=await this.jwtService.sign(payload);
            this.utilityservice.sendEmail(email,accessToken);
            return {message:"Please cheak your Email"};
          } catch (error) {
            console.log(typeof (error.code));
            if (error.code === '23505') {
              return new ConflictException("Email Already exsist")
            }
            else {
              return new InternalServerErrorException();
            }
          }
    }
    
    async sigIn(sigindto:SigninDto){
        const username=await this.validateUserpassword(sigindto);
        console.log(username);
        
        if(username==="1"){
            return new UnauthorizedException("Email Does Not Exist");
        }
        if(username==="2"){
          return new UnauthorizedException("Password Does Not Exist");
      }
      if(username==="3"){
        return new UnauthorizedException("You are Not varified");
    }
        const payload:JwtPayload={username};
        const accessToken=await this.jwtService.sign(payload);
        return {accessToken,username};
    }



    async varification(email:string){
      console.log(email);
      try{
      var update=await this.userRepository.
      createQueryBuilder()
      .update(User)
      .set({ is_verified:true})
      .where("email=:email", {email:email})
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
      async validateUserpassword(signindto:SigninDto):Promise<string>
      {
          const {email,password}=signindto;
          const user= await this.userRepository.createQueryBuilder("user")
          .where("user.email=:email",{email:email})
          .getOne();
          console.log(user)
          
         
    
      if(user)
      {
      if(user.is_verified==true){
        const hash= await bcrypt.hash(password,user.salt)  
        if(hash==user.password)
        {
         return user.name;
        }
        else 
        {
         return "2";
        }
      }
      else{
        return "3";
      }
    }
    else{
      return "1";
    }

    

      }
}
