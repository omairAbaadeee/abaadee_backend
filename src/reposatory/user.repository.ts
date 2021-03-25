import { SigninDto } from "src/dto/signin.dto";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credential.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async validateUserpassword(signindto:SigninDto):Promise<string>
      {
          const {username,password}=signindto;
          const user= await this.findOne(username);

          if (user && await user.validatPassword(password)) {
            return user.name;
          } else {
            return null;
          }

      }
     
}


