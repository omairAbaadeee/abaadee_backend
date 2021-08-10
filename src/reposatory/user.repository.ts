import { SigninDto } from "src/dto/signin.dto";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credential.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
     
}


