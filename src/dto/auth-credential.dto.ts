import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{

    @IsString()
    @MinLength(3)
    @MaxLength(12)
    name:string;
    email:string;
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    password:string;
    phone_number:string;
    city:string;
    location:string;
    is_active:boolean;
    is_verified:boolean;
    created_at:Date;

}