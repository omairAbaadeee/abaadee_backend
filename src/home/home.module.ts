import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddpropertyRepo } from '../reposatory/addproperty.reposatory';
import { AreaofunitRepositery } from '../reposatory/areaunit.reposatory';
import { CityRepository } from '../reposatory/city.repositery';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { LocationRepository } from '../reposatory/location.repository';
import { PropertyCategoryRepositery } from '../reposatory/propertycatogory.reposatory';
import { PropertytypeRepositery } from '../reposatory/propertytype.reposatory';
import { CountryRepository } from '../reposatory/country.reposatory';
import { ContactRepository } from 'src/reposatory/contact.reposatory';
import { AdvertisementReposatory } from 'src/reposatory/advertisement.reposatory';
import { FeatureAgencyRepository } from 'src/reposatory/featureagency.reposatory';
import { PartnerRepository } from 'src/reposatory/partner.reposatory';


@Module({
  imports:[TypeOrmModule.forFeature([AddpropertyRepo,AreaofunitRepositery,
  CityRepository,LocationRepository,PropertyCategoryRepositery,AdvertisementReposatory
  ,PropertytypeRepositery,CountryRepository,ContactRepository,FeatureAgencyRepository,PartnerRepository])],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
