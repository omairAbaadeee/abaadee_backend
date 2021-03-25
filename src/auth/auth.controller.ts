import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto, AuthCredentialsMessage } from 'src/dto/auth-credential.dto';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import jwt_decode from "jwt-decode";
import { DecodeDto } from 'src/dto/decode.dto';
import {FacebookUser} from "src/dto/addproerty.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private authsevices:AuthService,
    ){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<AuthCredentialsMessage>{
        console.log(authCredentialsDto);
       return this.authsevices.signUp(authCredentialsDto);
        
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe
    ) authCredentialsDto:AuthCredentialsDto) {
     return this.authsevices.sigIn(authCredentialsDto);
    }
    @Get("/varification/:acccess")
    //  @UseGuards(AuthGuard())
    varification(@Param("acccess") acccess,@Res() res){
        var decoded:DecodeDto = jwt_decode(acccess);
          this.authsevices.varification(decoded.email);
          res.redirect('http://localhost:3000/add-property');
          
    }
    // @Cron('5 * * * * *')
    // handleCron() {
    // console.log("Run")
    // }
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
    googleAuthRedirect(@Req() req) {
      return this.authsevices.googleLogin(req)
    }
}
