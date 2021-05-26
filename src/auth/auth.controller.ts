import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto, AuthCredentialsMessage } from 'src/dto/auth-credential.dto';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import jwt_decode from "jwt-decode";
import { DecodeDto } from 'src/dto/decode.dto';
import {FacebookUser} from "src/dto/addproerty.dto";
import { SigninDto } from 'src/dto/signin.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private authsevices:AuthService,
        
    ){}


    public decode:DecodeDto;
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<AuthCredentialsMessage>{
        console.log(authCredentialsDto);
       return this.authsevices.signUp(authCredentialsDto);
        
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe
    ) signindto:SigninDto) {
     console.log(signindto);
     return this.authsevices.sigIn(signindto);
    }
    @Get("/varification/:access")
  
    varification(@Param("access") access,@Res() res){
        var decoded:DecodeDto = jwt_decode(access);
       console.log(decoded.email)
          this.authsevices.varification(decoded.email);
          res.redirect('http://localhost:3000/add-property');
          
    }


    @Post("/Forgetemail")
    Forgetmail(@Body("email") email:string){

     return this.authsevices.Forgetmail(email);
    }

    @Get("/Forgetpass/:access")
    Redirect(@Param("access") access,@Res() res){
      this.decode= jwt_decode(access);
      console.log(this.decode.email);
      res.redirect("http://localhost:3000/reset/password");
     
    }

    @Post("/Forgetpass")
    Forgetpass(@Body("password") password:string){


      return this.authsevices.Forgetpass(this.decode.email,password);
    }

    
    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
      return HttpStatus.OK;
    }
  
    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req): Promise<any> {
        console.log(req.user)
      return {
        statusCode: HttpStatus.OK,
        data: req.user,
      };
    
    }





    //Google
    @Get("google")
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }
  
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req,@Res() res) {
      res.redirect("http://localhost:3000/add-property");
      return this.authsevices.googleLogin(req)
    }




    
    @Post("/socialsignup")
    SocialSignup(@Body("username") username:string , @Body("email") email:string , @Body("imageurl")imageurl:string){
      //console.log(email);
       return this.authsevices.SocialSignup(username,email,imageurl);
    }

}
