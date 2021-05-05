import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaSize } from 'src/entity/area_size.entity';
import { Areaofunit } from 'src/entity/area_unit.entity';
import { City } from 'src/entity/city.entity';
import { Price } from 'src/entity/price.entity';
import { PropertyCategory } from 'src/entity/property_category.entity';
import { PropertyType } from 'src/entity/property_type.entity';
import { AreasizeRepositery } from 'src/reposatory/areasize.reposatory';
import { AreaofunitRepositery } from 'src/reposatory/areaunit.reposatory';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { PriceRepository } from 'src/reposatory/price.repositery';
import { PropertyCategoryRepositery } from 'src/reposatory/propertycatogory.reposatory';
import { PropertytypeRepositery } from 'src/reposatory/propertytype.reposatory';
import { CountryRepository } from 'src/reposatory/country.reposatory';
import { Country } from 'src/entity/country.entity';
@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(PriceRepository)
        private pricerepo: PriceRepository,

     

        @InjectRepository(CityRepository)
        private cityrepo: CityRepository,

        @InjectRepository(LocationRepository)
        private locationrepo: LocationRepository,

        @InjectRepository(AreasizeRepositery)
        private areasizerepo: AreasizeRepositery,

        @InjectRepository(AreaofunitRepositery)
        private areaunitrepo: AreaofunitRepositery,

        @InjectRepository(PropertytypeRepositery)
        private propertytyperepo: PropertytypeRepositery,

        @InjectRepository(PropertyCategoryRepositery)
        private propertycatogoryrepo: PropertyCategoryRepositery,

        @InjectRepository(CountryRepository)
        private countryrepo: CountryRepository,
    ) { }
    //Get All  City And Location
    async getallcity(): Promise<City[]> {
        const city = await this.cityrepo
            .createQueryBuilder("city")
            .getMany();
        return city;
    }
    async getallcountry(): Promise<Country[]> {
        const country = await this.countryrepo
            .createQueryBuilder("country")
         
            .getMany();
        return country;
    }
    async getaonecountry(country_name:string): Promise<Country> {
        const country = await this.countryrepo
            .createQueryBuilder("country")
            .leftJoinAndSelect("country.city","city")
            .where("country.country_name=:country_name",{country_name:country_name})
            .getOne();
        return country;
    }
    async getalllacation(cityname:string){
        const city = await this.cityrepo
        .createQueryBuilder("city")
         .leftJoinAndSelect("city.location","location")
         .where("city.city_name=:city_name",{city_name:cityname})
        .getMany();
    return city;

    }
    //  async createcountry() {
    //     const country= new Country();   
    //     country.country_name="Pakistan";
    //     country.country_code="+92";
    //     country.sort_name="PK";
    //     await this.countryrepo.save(country);
    //     const states =new State();
    //     states.state_name="Sindh";
    //     states.country=country;
    //     await this.staterepo.save(states);
    //     const cities= new City();
    //     cities.cityname="Karachi";
    //     cities.state=states;
    //     await this.cityrepo.save(cities);
    //     const locations= new Location();
    //     locations.locationname="Malir";
    //     locations.city=cities; 
    //     await this.locationrepo.save(locations);
    //     }

    //Price Get And Post
    async getallprice(): Promise<Price[]> {
        return await this.pricerepo.find();
    }
    async createprice(prices: string) {
        const price = new Price();
        price.price = prices;

        await this.pricerepo.save(price);
    }
    //Beds Get And Post
  
       //Working on area_size
       async getallareasize(): Promise<AreaSize[]> {
        return this.areasizerepo.find();
    }

    async createareasize(area_size: number) {
        const areasize = new AreaSize();
        areasize.area_size = area_size;
        await this.areasizerepo.save(areasize);
    }
      //Working on area_unit
    async getallareaunit(): Promise<Areaofunit[]> {
        return this.areaunitrepo.find();
    }

    async createareaunit(area_name: string) {
        const areaunit = new Areaofunit();
        areaunit.area_name = area_name;
        await this.areaunitrepo.save(areaunit);
    }
    //PropertyType
    
     async getallPropertytype(): Promise<PropertyType[]> {
        const propertytype = await this.propertytyperepo
        .createQueryBuilder("type")
        .leftJoinAndSelect("type.property", "property")
        .getMany();
        return propertytype;
    }
 

    async createPropertycatogory() {
     const propertycatogory=new PropertyCategory();
     propertycatogory.property_category_name="Residential Plot";
     await this.propertycatogoryrepo.save(propertycatogory);
     
     const propertycatogory1=new PropertyCategory();
     propertycatogory1.property_category_name="Commercial Plot";
     await this.propertycatogoryrepo.save(propertycatogory1);

     const propertycatogory2=new PropertyCategory();
     propertycatogory2.property_category_name="Agricultural Land";
     await this.propertycatogoryrepo.save(propertycatogory2);

     const propertycatogory3=new PropertyCategory();
     propertycatogory3.property_category_name="Industrial Land";
     await this.propertycatogoryrepo.save(propertycatogory3);

     const propertycatogory4=new PropertyCategory();
     propertycatogory4.property_category_name="Plot File";
     await this.propertycatogoryrepo.save(propertycatogory4);

     const propertycatogory5=new PropertyCategory();
     propertycatogory5.property_category_name="Plot Form";
     await this.propertycatogoryrepo.save(propertycatogory5);

    //  const propertycatogory6=new PropertyCategory();
    //  propertycatogory6.property_category_name="Penthouse";
    //  await this.propertycatogoryrepo.save(propertycatogory6);

      const propertytype=new PropertyType();
      propertytype.property_type_name="Plots";
      propertytype.property=[propertycatogory,propertycatogory1,propertycatogory2,propertycatogory3,propertycatogory4,propertycatogory5];
      await this.propertytyperepo.save(propertytype);

    }

}
