import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
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
import { FeatureAgencyRepository } from 'src/reposatory/featureagency.reposatory';
import { FeatureAgency } from 'src/entity/featureagency.entity';
import { PartnerRepository } from 'src/reposatory/partner.reposatory';
import { Partner } from 'src/entity/paetner.entity';
import { HomepopupReposatory } from 'src/reposatory/homepopupRepo.reposatory';
import { Homepopup } from 'src/entity/popup.entity';
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

        @InjectRepository(FeatureAgencyRepository)
        private featureagencyrepo: FeatureAgencyRepository,

        @InjectRepository(PartnerRepository)
        private partnerRepo: PartnerRepository,

        @InjectRepository(HomepopupReposatory)
        private homepopupRepo: HomepopupReposatory,
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
    async getaonecountry(country_name: string): Promise<Country> {
        const country = await this.countryrepo
            .createQueryBuilder("country")
            .leftJoinAndSelect("country.city", "city")
            .where("country.country_name=:country_name", { country_name: country_name })
            .getOne();
        return country;
    }
    async getalllacation(cityname: string) {
        const city = await this.cityrepo
            .createQueryBuilder("city")
            .leftJoinAndSelect("city.location", "location")
            .where("city.city_name=:city_name", { city_name: cityname })
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
        const propertycatogory = new PropertyCategory();
        propertycatogory.property_category_name = "Residential Plot";
        await this.propertycatogoryrepo.save(propertycatogory);

        const propertycatogory1 = new PropertyCategory();
        propertycatogory1.property_category_name = "Commercial Plot";
        await this.propertycatogoryrepo.save(propertycatogory1);

        const propertycatogory2 = new PropertyCategory();
        propertycatogory2.property_category_name = "Agricultural Land";
        await this.propertycatogoryrepo.save(propertycatogory2);

        const propertycatogory3 = new PropertyCategory();
        propertycatogory3.property_category_name = "Industrial Land";
        await this.propertycatogoryrepo.save(propertycatogory3);

        const propertycatogory4 = new PropertyCategory();
        propertycatogory4.property_category_name = "Plot File";
        await this.propertycatogoryrepo.save(propertycatogory4);

        const propertycatogory5 = new PropertyCategory();
        propertycatogory5.property_category_name = "Plot Form";
        await this.propertycatogoryrepo.save(propertycatogory5);

        //  const propertycatogory6=new PropertyCategory();
        //  propertycatogory6.property_category_name="Penthouse";
        //  await this.propertycatogoryrepo.save(propertycatogory6);

        const propertytype = new PropertyType();
        propertytype.property_type_name = "Plots";
        propertytype.property = [propertycatogory, propertycatogory1, propertycatogory2, propertycatogory3, propertycatogory4, propertycatogory5];
        await this.propertytyperepo.save(propertytype);

    }
    async contactus(contactdto: Contactdto): Promise<any> {
        try {
            const { f_name, l_name, p_number, email, message } = contactdto;
            const contact = new Contact();
            contact.f_name = f_name;
            contact.l_name = l_name;
            contact.email = email;
            contact.p_number = p_number;
            contact.message = message;
            contact.date = new Date;
            await this.contactrepo.save(contact);
            return { massage: "Response Submited" }
        }
        catch {
            return { massage: "Error in contact" }
        }

    }
    async getallcontact(): Promise<Contact[]> {
        return await this.contactrepo.createQueryBuilder().getMany();
    }

    addAdvertisement(advertisementdto: Advertisementdto, images: Addimagedto) {
        const { company_name, company_url, page_name,additional_page_name } = advertisementdto;

        try {


            const advertisement = new Advertisement();
            advertisement.advertisement_img = url + "/home/Advertisement/" + images.filename;
            advertisement.company_name = company_name;
            advertisement.company_link = company_url;
            advertisement.page_name = page_name;
            if(page_name=="Popular Cities To Buy Properties" || page_name=="Popular Locations For Homes"){
            advertisement.additional_page_name=additional_page_name;
            }
            advertisement.date = new Date;
            this.advertiserepo.save(advertisement);

            return { message: "Response Submited" }

        } catch (error) {

            return { message: `Error in advertisement${error}` }

        }

    }
    async getadvertise_for_popular(page_name:string,position:string):Promise<Advertisement[]>{
        return await this.advertiserepo.createQueryBuilder("advertize")
        .where("advertize.page_name=:page_name", { page_name: page_name})
        .andWhere("advertize.additional_page_name=:additional_page_name",{additional_page_name:position})
        .getMany(); 
    }
     //getadvertize
     async getadvertize(pagename:string):Promise<Advertisement[]> {
        return await this.advertiserepo.createQueryBuilder("advertize")
        .where("advertize.page_name=:page_name", { page_name: pagename}).getMany();
     }
    //Feature Agency
    async addagency(images: Addimagedto,F_link:string):Promise<any>{
     try{
    const agency=new FeatureAgency();
     agency.f_image=url+"/home/agencyimage/"+images;
     agency.f_link=F_link;
     await this.featureagencyrepo.save(agency);
     return HttpStatus.CREATED;
    }catch{
        return  HttpStatus.BAD_REQUEST;
    }

    }
    //getagency
    async getagency():Promise<FeatureAgency[]> {
       return await this.featureagencyrepo.createQueryBuilder().getMany();
    }
    //Partner
    async Addpartner(imagePath,partner_link):Promise<any>{
        try{
      const partner = new Partner();
      partner.p_image=url + "/home/partnerimage/" +imagePath;
      partner.p_link=partner_link;
      await this.partnerRepo.save(partner);
      return HttpStatus.CREATED;
        }catch{
            return  HttpStatus.BAD_REQUEST;
    }
}
//homepopup
    async AddPOPUP(imagePath,homepopup_link):Promise<any>{
    try{
        const homepopup=new Homepopup();
        homepopup.homepopup_link=homepopup_link
        homepopup.homepopup_image= url + "/home/homepopupimage/" +imagePath;
        await this.homepopupRepo.save(homepopup);
        return HttpStatus.CREATED;
    }
    catch{
        return  HttpStatus.BAD_REQUEST;
    }
}

 
}
