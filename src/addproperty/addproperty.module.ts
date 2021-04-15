import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AddfeatureReposatory } from 'src/reposatory/addfeature.dto';
import { AddpropertyRepo } from 'src/reposatory/addproperty.reposatory';
import { AreasizeRepositery } from 'src/reposatory/areasize.reposatory';
import { AreaofunitRepositery } from 'src/reposatory/areaunit.reposatory';
import { BathRepositery } from 'src/reposatory/bath.reposatory';
import { BedsRepositery } from 'src/reposatory/beds.reposatory';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { PriceRepository } from 'src/reposatory/price.repositery';
import { PropertyCategoryRepositery } from 'src/reposatory/propertycatogory.reposatory';
import { PropertyimagesRepositery } from 'src/reposatory/propertyimage.reposatory';
import { PropertytypeRepositery } from 'src/reposatory/propertytype.reposatory';
import { UserRepository } from 'src/reposatory/user.repository';
import { AddpropertyController } from './addproperty.controller';
import { AddpropertyService } from './addproperty.service';

@Module({
  imports:[TypeOrmModule.forFeature([AddpropertyRepo,AreaofunitRepositery,AreasizeRepositery,BathRepositery,BedsRepositery,
    CityRepository,LocationRepository,PriceRepository,PropertyimagesRepositery
    ,PropertyCategoryRepositery,PropertytypeRepositery,UserRepository,AddfeatureReposatory]),
    AuthModule
  ],
  controllers: [AddpropertyController],
  providers: [AddpropertyService]
})
export class AddpropertyModule {}
