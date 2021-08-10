import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AddfeatureReposatory } from 'src/reposatory/addfeature.dto';
import { AddpropertyRepo } from 'src/reposatory/addproperty.reposatory';
import { AreaofunitRepositery } from 'src/reposatory/areaunit.reposatory';
import { CityRepository } from 'src/reposatory/city.repositery';
import { General_Info_Repository } from 'src/reposatory/generalinfo.reposatory';
import { LocationRepository } from 'src/reposatory/location.repository';
import { PropertyCategoryRepositery } from 'src/reposatory/propertycatogory.reposatory';
import { PropertyContactReposatory } from 'src/reposatory/propertycontactrepo.reposatory';
import { PropertyimagesRepositery } from 'src/reposatory/propertyimage.reposatory';
import { PropertytypeRepositery } from 'src/reposatory/propertytype.reposatory';
import { UserRepository } from 'src/reposatory/user.repository';
import { UtilityService } from 'src/utility/utility.service';
import { AddpropertyController } from './addproperty.controller';
import { AddpropertyService } from './addproperty.service';

@Module({
  imports:[TypeOrmModule.forFeature([AddpropertyRepo,AreaofunitRepositery,
    CityRepository,LocationRepository,PropertyimagesRepositery
    ,PropertyCategoryRepositery,PropertytypeRepositery,UserRepository,AddfeatureReposatory
    ,General_Info_Repository,PropertyContactReposatory]),
    AuthModule
  ],
  controllers: [AddpropertyController],
  providers: [AddpropertyService]
})
export class AddpropertyModule {}
