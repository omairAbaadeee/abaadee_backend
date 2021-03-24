import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{

    @IsString()

    name:string;
    email:string;
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password:string;
    phone_number:string;
    country:string;
    city:string;

    is_active:boolean;
    is_verified:boolean;
    created_at:Date;

}
export class AuthCredentialsMessage{
message:string;
}