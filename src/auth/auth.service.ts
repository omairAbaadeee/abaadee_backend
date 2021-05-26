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
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(CityRepository)
    private cityrepo: CityRepository,

    @InjectRepository(LocationRepository)
    private locationrepo: LocationRepository,

    @InjectRepository(CountryRepository)
    private countryrepo: CountryRepository,

    private jwtService: JwtService,
    private utilityservice: UtilityService
  ) { }


  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<AuthCredentialsMessage> {

    var { user_name, email, password, phone_number, city, country,
      is_active, is_verified, created_at,
    } = authCredentialsDto;
    is_active = true;
    is_verified = false;
    created_at = new Date();
    const user1 = await this.userRepository.createQueryBuilder("user")
      .where("user.email=:email", { email: email })
      .getOne();



    const user = new User();
    user.name = user_name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashpassword(password, user.salt);
    //console.log(user.password);
    user.phone_number = phone_number;

    const findcountry = await this.countryrepo
      .createQueryBuilder("country")
      .where("country.country_name = :country_name", { country_name: country })
      .getOne();
    user.country = findcountry;

    const findcity = await this.cityrepo
      .createQueryBuilder("city")
      .where("city.city_name = :city_name", { city_name: city })
      .getOne();
    user.city = findcity;



    user.is_active = is_active;
    user.is_verified = is_verified;
    user.created_at = created_at;



    try {

      await this.userRepository.save(user);

      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      const para = "Thank you for choosing <strong>Abaadee.com</strong> First, you need to confirm your account. Just press the button below.";
      this.utilityservice.sendEmail(email, "/varification/" + accessToken, "Confirm Account", para, "Account Varification");
      return { message: "Please cheak your Email" };
    }
    catch (error) {
      console.log(typeof (error.code));
      if (error.code === '23505') {
        return new ConflictException("Email Already exsist")
      }
      else {
        return new InternalServerErrorException();
      }
    }
  }




  async sigIn(sigindto: SigninDto) {
    const email = await this.validateUserpassword(sigindto);
    console.log(email);

    if (email === "1") {
      return new UnauthorizedException("Email Does Not Exist");
    }
    if (email === "2") {
      return new UnauthorizedException("Password Does Not Exist");
    }
    if (email === "3") {
      return new UnauthorizedException("You are Not varified");
    }
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    const findusername = await this.userRepository.createQueryBuilder("user").where("user.email=:email", { email: email }).getOne();
    const findname = findusername.name;
    return { accessToken, findname };
  }


  async Forgetmail(email: string): Promise<any> {

    const query = await this.userRepository.createQueryBuilder("user").
      where("user.email=:email", { email: email })
      .andWhere("user.is_verified=:is_verified", { is_verified: true })
      .getOne();
    if (query) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      console.log(accessToken);
      const para = "Please click <strong>Below Button</strong> to change your password";
      this.utilityservice.sendEmail(email, "/Forgetpass/" + accessToken, "Click Here", para, "Reset Password");
      return { message: "Your Password has been sent to the specified email address" }
    }
    else {
      return new UnauthorizedException("Invalid email or Email doesn't exist");
    }


  }

  async Forgetpass(email: string, password: string) {
    const salt = await bcrypt.genSalt();
    const password1 = await this.hashpassword(password, salt);

    var update = await this.userRepository.
      createQueryBuilder()
      .update(User)
      .set({ password: password1, salt: salt })
      .where("email=:email", { email: email })
      .execute();

    return "Password change successfully";

  }

  async varification(email: string) {
    console.log(email);
    try {
      var update = await this.userRepository.
        createQueryBuilder()
        .update(User)
        .set({ is_verified: true })
        .where("email=:email", { email: email })
        .execute();
      return { massage: "Your account is varified" };
    }
    catch {
      return throwError("Error");
    }
  }



  private async hashpassword(password: string, salt: string): Promise<string> {

    return bcrypt.hash(password, salt);
  }

  //Google
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    else {
      const user = await this.userRepository.createQueryBuilder("user")
      .where("user.email=:email", { email: req.user.email })
      .getOne();
      if(!user && user.is_verified==false){
      const pass=req.user.lastName+"-abaadee";
      // console.log(req.user);
      const user1=new User();
      user1.name=req.user.firstName+req.user.lastName;
      user1.email=req.user.email;
      user1.salt = await bcrypt.genSalt();
      user1.password = await this.hashpassword(pass, user1.salt);
      user1.created_at=new Date;
      user1.is_active=true;
      user1.is_verified=true;
      user1.city=null;
      user1.location=null;
      user1.country=null;
      user1.phone_number=null;
      await this.userRepository.save(user1);
      }
      const email=req.user.email;
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return {
        user: accessToken,
        name: req.user.firstName+req.user.lastName
      }
    }
  }
  async validateUserpassword(signindto: SigninDto): Promise<string> {
    const { email, password } = signindto;
    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.email=:email", { email: email })
      .getOne();
    console.log(user)



    if (user) {
      if (user.is_verified == true) {
        const hash = await bcrypt.hash(password, user.salt)
        if (hash == user.password) {
          return user.email;
        }
        else {
          return "2";
        }
      }
      else {
        return "3";
      }
    }
    else {
      return "1";
    }



  }


  async SocialSignup(username:string,Email:string,imageurl:string){ 
    const user = await this.userRepository.createQueryBuilder("user")
    .where("user.email=:email", { email: Email })
    .getOne();
    if (user) {
      const email=Email;
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return {
        user: accessToken,
        name: username
      }
  }
  else {
   
    
    var pass=username+"-abaadee";
    // console.log(req.user);
    const user1=new User();
    user1.name=username;
    user1.email=Email;
    user1.salt = await bcrypt.genSalt();
    user1.password = await this.hashpassword(pass, user1.salt);
    user1.created_at=new Date;
    user1.is_active=true;
    user1.is_verified=true;
    user1.city=null;
    user1.location=null;
    user1.country=null;
    user1.phone_number=null;
    await this.userRepository.save(user1);
    }
    const email=Email;
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    const para = " Your new Login Credentials AT ABAADEE.COM Are : <br/>"
    +"USERNAME :" +username+" <br/> PASSWORD : "+pass;
      this.utilityservice.sendEmail(email,"","", para, "ABAADEE LOGIN");
    return {
      user: accessToken,
      name:username
    }
  }
}

