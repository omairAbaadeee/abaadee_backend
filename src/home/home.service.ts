import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Areaofunit } from 'src/entity/area_unit.entity';
import { City } from 'src/entity/city.entity';
import { PropertyCategory } from 'src/entity/property_category.entity';
import { PropertyType } from 'src/entity/property_type.entity';
import { AreaofunitRepositery } from 'src/reposatory/areaunit.reposatory';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { PropertyCategoryRepositery } from 'src/reposatory/propertycatogory.reposatory';
import { PropertytypeRepositery } from 'src/reposatory/propertytype.reposatory';
import { CountryRepository } from 'src/reposatory/country.reposatory';
import { Country } from 'src/entity/country.entity';
import { Contact } from 'src/entity/contact.entity';
import { ContactRepository } from 'src/reposatory/contact.reposatory';
import { Contactdto } from 'src/dto/contact.dto';
import { AdvertisementReposatory } from 'src/reposatory/advertisement.reposatory';
import { Advertisementdto } from 'src/dto/Advertisement.dto';
import { Addimagedto } from 'src/dto/addproerty.dto';
import { Advertisement } from 'src/entity/advertisement.entity';
import { url } from 'src/Global/Variable';
@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(CityRepository)
        private cityrepo: CityRepository,

        @InjectRepository(LocationRepository)
        private locationrepo: LocationRepository,


        @InjectRepository(AreaofunitRepositery)
        private areaunitrepo: AreaofunitRepositery,

        @InjectRepository(PropertytypeRepositery)
        private propertytyperepo: PropertytypeRepositery,

        @InjectRepository(PropertyCategoryRepositery)
        private propertycatogoryrepo: PropertyCategoryRepositery,

        @InjectRepository(CountryRepository)
        private countryrepo: CountryRepository,

        @InjectRepository(ContactRepository)
        private contactrepo: ContactRepository,

        @InjectRepository(AdvertisementReposatory)
        private advertiserepo: AdvertisementReposatory,
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
    async contactus(contactdto:Contactdto):Promise<any>{
        try{
        const {f_name,l_name,p_number,email,message}=contactdto;
        const contact=new Contact();
        contact.f_name=f_name;
        contact.l_name=l_name;
        contact.email=email;
        contact.p_number=p_number;
        contact.message=message;
        contact.date=new Date;
       await  this.contactrepo.save(contact);
       return {massage:"Response Submited"}
        }
        catch{
            return {massage:"Error in contact"}
        }

    }
    async getallcontact():Promise<Contact[]>{
         return await this.contactrepo.createQueryBuilder().getMany();
    }

    addAdvertisement(advertisementdto:Advertisementdto, images: Addimagedto){
    const{company_name,company_link,page_name}=advertisementdto;
      const advertisement=new Advertisement();
      advertisement.advertisement_img=url+"/addproperty/Advertisement/"+images.filename;
      advertisement.company_name=company_name;
      advertisement.company_link=company_link;
      advertisement.page_name=page_name;
      this.advertiserepo.save(advertisement);


    }

}
