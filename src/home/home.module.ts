import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddpropertyRepo } from '../reposatory/addproperty.reposatory';
import { AreasizeRepositery } from '../reposatory/areasize.reposatory';
import { AreaofunitRepositery } from '../reposatory/areaunit.reposatory';
import { BathRepositery } from '../reposatory/bath.reposatory';
import { BedsRepositery } from '../reposatory/beds.reposatory';
import { CityRepository } from '../reposatory/city.repositery';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { LocationRepository } from '../reposatory/location.repository';
import { PriceRepository } from '../reposatory/price.repositery';
import { PropertyCategoryRepositery } from '../reposatory/propertycatogory.reposatory';
import { PropertytypeRepositery } from '../reposatory/propertytype.reposatory';


@Module({
  imports:[TypeOrmModule.forFeature([AddpropertyRepo,AreaofunitRepositery,AreasizeRepositery,BathRepositery,BedsRepositery,
  CityRepository,LocationRepository,PriceRepository,PropertyCategoryRepositery,PropertytypeRepositery])],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
