import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Addimagedto, Addpropertydto } from 'src/dto/addproerty.dto';
import { AddpropertySearch } from 'src/dto/addpropertysearch.dto';
import { Addproperty, Purpose } from 'src/entity/addproperty.entity';
import { Features } from 'src/entity/features.entity';
import { Propertyimage } from 'src/entity/propertyimage.entity';
import { User } from 'src/entity/user.entity';
import { AddfeatureReposatory } from 'src/reposatory/addfeature.dto';
import { AddpropertyRepo } from 'src/reposatory/addproperty.reposatory';
import { AreasizeRepositery } from 'src/reposatory/areasize.reposatory';
import { AreaofunitRepositery } from 'src/reposatory/areaunit.reposatory';
import { BathRepositery } from 'src/reposatory/bath.reposatory';
import { BedsRepositery } from 'src/reposatory/beds.reposatory';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { PropertyCategoryRepositery } from 'src/reposatory/propertycatogory.reposatory';
import { PropertyimagesRepositery } from 'src/reposatory/propertyimage.reposatory';
import { PropertytypeRepositery } from 'src/reposatory/propertytype.reposatory';
import { UserRepository } from 'src/reposatory/user.repository';

@Injectable()
export class AddpropertyService {
    constructor(
        @InjectRepository(AddpropertyRepo)
        private addpropertyrepo: AddpropertyRepo,

        @InjectRepository(LocationRepository)
        private locationrepo: LocationRepository,

        @InjectRepository(BedsRepositery)
        private bedsrepo: BedsRepositery,

        @InjectRepository(BathRepositery)
        private bathrepo: BathRepositery,

        @InjectRepository(AreasizeRepositery)
        private areasizerepo: AreasizeRepositery,

        @InjectRepository(AreaofunitRepositery)
        private areaunitrepo: AreaofunitRepositery,

        @InjectRepository(PropertytypeRepositery)
        private propertytyperepo: PropertytypeRepositery,

        @InjectRepository(PropertyCategoryRepositery)
        private propertycatogoryrepo: PropertyCategoryRepositery,

        @InjectRepository(CityRepository)
        private cityrepo: CityRepository,

        @InjectRepository(UserRepository)
        private userRepository:UserRepository,

        @InjectRepository(PropertyimagesRepositery)
        private proimageRepository:PropertyimagesRepositery,

        @InjectRepository(AddfeatureReposatory)
        private addfeaturerepo:AddfeatureReposatory,
    ) { }
   public date=new Date();
   
   public expirydate():Date{
    let  days: number=90;
    let date=new Date();
    date.setDate(date.getDate() + (days));
   return date;
    }

    async addproperty(addpropertydto: Addpropertydto,user:User,images:Addimagedto[]) {

        const { purpose, property_title, property_description, land_area,  
         area_unit_name,
        bed,
        bathroom, property_type,
        property_category,
        city_name,
        location_name, price ,title_image,is_verified,featurename} = addpropertydto;
   
       

        const createdat =new Date();
        const updateddat=new  Date();
        const expiredate=this.expirydate();
        const addproperty = new Addproperty();
        

        
        addproperty.purpose = purpose;
        //console.log(purpose);
        addproperty.createdat = createdat;
        //console.log(createdat);
        addproperty.property_title = property_title;
        //console.log(propertytitle);
        addproperty.property_description = property_description;
        //console.log(propertydescription);
        addproperty.land_area = land_area;
        //console.log(landarea);
        addproperty.price = price;
        //console.log(price);
        addproperty.updatedat=updateddat;
        //console.log(updateddat);
        addproperty.expiredate=expiredate;
        //console.log(expiredate);
        addproperty.title_image=title_image;
        addproperty.is_verified=is_verified;
         addproperty.title_image="Ahmed";

      
      
        const findcity = await  this.cityrepo
        .createQueryBuilder("city")
        .where("city.city_name = :city_name", { city_name: city_name })
        .getOne();
        addproperty.city = findcity;
        //console.log(findcity);
        const findlocation = await this.locationrepo
        .createQueryBuilder("location")
        .where("location.location_name = :location_name", { location_name: location_name })
        .getOne();
        addproperty.Location = findlocation;
        //console.log(findlocation);
        const findbeds = await this.bedsrepo.findOne(bed);
        addproperty.bed = findbeds;
        //console.log(findbeds);
        const findbaths = await this.bathrepo.findOne(bathroom);
        addproperty.bathroom = findbaths;
        //console.log(findbaths);
        const findareaunit = await this.areaunitrepo
           .createQueryBuilder("areaofunit")
           .where("areaofunit.area_name = :area_name", { area_name: area_unit_name })
           .getOne();
        // const findareaunit = await this.areaunitrepo.findOne({areaunitname});
        addproperty.area_unit = findareaunit;
        //console.log(findareaunit);

        const findprosubtype = await this.propertycatogoryrepo
        .createQueryBuilder("propertycatogoryname")
        .where("propertycatogoryname.property_category_name = :property_category_name", { property_category_name: property_category })
        .getOne();
       // const findprosubtype = await this.propertycatogoryrepo.findOne(propertysubtype);
        addproperty.property_category = findprosubtype;
        //console.log(findprosubtype);
        

        const findprotype = await this.propertytyperepo
        .createQueryBuilder("propertytype")
        .where("propertytype.property_type_name = :property_type_name", { property_type_name: property_type })
        .getOne();
        //const findprotype = await this.propertytyperepo.findOne(propertytype);
        addproperty.property_type = findprotype;
        //console.log(findprotype);
        

         
        // const finduser = await this.userRepository
        // .createQueryBuilder("user")
        // .where("user.name = :name", { name: username })
        // .getOne();
        //const finduser = await this.userRepository.findOne(username);
        //console.log(finduser);
        addproperty.userid = user;

         await this.addpropertyrepo.save(addproperty);
         
         this.addimage(images,addproperty);
         this.Addfeature(addproperty,featurename)


    }
    async Addfeature(addproperty:Addproperty,feature:string){
    var Array=[];
    Array.push(feature);
    Array.forEach(Element=>{
        console.log(Element);
        Element.forEach(element => {
            const features=new Features();
            features.addproperty=addproperty;
            features.feature_name=element;
            this.addfeaturerepo.save(features);
        })
    })

    }

    async addimage(images:Addimagedto[],propertyid:Addproperty){

       
    images.forEach(async element=>{
        const propertyimage=new Propertyimage();
        propertyimage.imageurl="http://localhost:3200/addproperty/image/"+element.filename;
        propertyimage.addproperty=propertyid;
        await this.proimageRepository.save(propertyimage); 
    })

}
    async getalldata():Promise<Addproperty[]>{
    const findalldata=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .getMany();
    // console.log(findalldata);
    //  const findalldata= await this.proimageRepository.createQueryBuilder("images")
    //  .leftJoinAndSelect("images.addproperty","addproperty").getMany();
    //  console.log(findalldata)
     return findalldata;    
}
async find_data_From_cityname(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
    const {purpose,city_name}=addpropertysearch;
   
    const findDataByCity=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .andWhere("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("city.city_name=:city_name",{city_name:city_name})
    .getMany();
    if(!findDataByCity){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findDataByCity;
    }
    
}

//FindWithLocationName//
    async find_data_From_locationname(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
        const {purpose,location_name}=addpropertysearch;
    const findDataByLocation=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .andWhere("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("Location.location_name =:location_name",{location_name:location_name})
    .getMany();
    if(!findDataByLocation){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findDataByLocation;
    }
    
}
//FindWithBathroomQuantity//
//FindByAreaUnit
async find_data_From_AreaUnit(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
    const {area_unit_name,purpose}=addpropertysearch;
    const findDataByAreaUnit=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .andWhere("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("area_unit.area_name =:area_name",{area_name:area_unit_name})
    .getMany();
    return findDataByAreaUnit;
}
//FindByBed//
async find_data_From_Bed(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
    const {beds,purpose}=addpropertysearch;
    const findDataByBed=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .andWhere("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("bed.beds_quantity =:beds_quantity",{beds_quantity:beds})

    .getMany();
    if(!findDataByBed){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findDataByBed;
    }
}



//FindByPropertySubType//
async find_data_From_PropertySubType(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
    const {property_catogory,purpose}=addpropertysearch;
    const findDataByproperty_category=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .andWhere("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("property_category.property_category_name =:property_category_name",{property_category_name:property_catogory})
    .getMany();
    if(!findDataByproperty_category){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findDataByproperty_category;
    }
}

//FindDataFromCityname,Locationname//

async find_data_From_Cityname_Locationname(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
    const {city_name,location_name,purpose}=addpropertysearch;
   // console.log("Ahmed")
    const findonedatabyCity_Location=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("city.city_name =:city_name",{city_name:city_name})
    .andWhere("Location.location_name =:location_name",{location_name:location_name})
    .getMany();
    if(!findonedatabyCity_Location){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findonedatabyCity_Location;
    }
}

//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit//

async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
    const {city_name,location_name,area_unit_name,purpose}=addpropertysearch;
    const findonedatabyCity_Location_Bathroom_AreaUnit=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("city.city_name =:city_name",{city_name:city_name})
    .andWhere("Location.location_name =:location_name",{location_name:location_name})
    .andWhere("area_unit.area_name =:area_name",{area_name:area_unit_name})
    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit;
    }
}

//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit,BedNumber//

async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber(addpropertysearch:AddpropertySearch):Promise<Addproperty[]>{
    const {city_name,location_name,area_unit_name,purpose,beds}=addpropertysearch;
    const findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("city.city_name =:city_name",{city_name:city_name})
    .andWhere("Location.location_name =:location_name",{location_name:location_name})
    .andWhere("area_unit.area_name =:area_name",{area_name:area_unit_name})
    .andWhere("bed.beds_quantity =:beds_quantity",{beds_quantity:beds})
    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber;
    }
}

//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit,BedNumber,PropertyType//


async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType(addpropertysearch:AddpropertySearch ):Promise<Addproperty[]>{
    const {city_name,location_name,area_unit_name,purpose,beds,property_catogory}=addpropertysearch;
    const findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("city.city_name =:city_name",{city_name:city_name})
    .andWhere("Location.location_name =:location_name",{location_name:location_name})
    .andWhere("areaunit.area_name =:area_name",{area_name:area_unit_name})
    .andWhere("bed.beds_quantity =:beds_quantity",{beds_quantity:beds})
    .andWhere("property_category.property_category_name =:property_category_name",{property_category_name:property_catogory})
    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType;
    }
}



//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit,BedNumber,PropertyType,PropertySubType//
async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType_PropertySubType(addpropertysearch:AddpropertySearch ):Promise<Addproperty[]>{
     const {purpose, city_name, location_name, property_catogory, min_price,max_price,min_area,max_area,beds,area_unit_name}=addpropertysearch;
   
     const minprice=parseInt(min_price.replace(",",""));
     const maxprice=parseInt(max_price.replace(",",""))
     console.log(typeof(minprice))
     const findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType_PropertySubType=await this.addpropertyrepo.createQueryBuilder("addproperty")
     .leftJoinAndSelect("addproperty.images","images")
     .leftJoinAndSelect("addproperty.city","city")
     .leftJoinAndSelect("addproperty.Location","Location")
     .leftJoinAndSelect("addproperty.bathroom","bathroom")
     .leftJoinAndSelect("addproperty.area_unit","area_unit")
     .leftJoinAndSelect("addproperty.bed","bed")
     .leftJoinAndSelect("addproperty.property_type","property_type")
     .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("city.city_name =:city_name",{city_name:city_name})
    .andWhere("Location.location_name =:location_name",{location_name:location_name})
    .andWhere("area_unit.area_name =:area_name",{area_name:area_unit_name})
    .andWhere("bed.beds_quantity =:beds_quantity",{beds_quantity:beds})
    .andWhere(`addproperty.price BETWEEN '${minprice}' AND '${maxprice}'`)
    .andWhere(`addproperty.land_area BETWEEN '${parseInt(min_area)}' AND '${parseInt(max_area)}'`)
    .andWhere("property_category.property_category_name =:property_category_name",{property_category_name:property_catogory})
    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType_PropertySubType){
        return this.find_data_From_Purpose(purpose);
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType_PropertySubType;
    }
}
async getalldataByPurpose(purpose:string):Promise<Addproperty[]>{
    const findalldataByPurpose=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .andWhere("addproperty.purpose=:purpose", {purpose:purpose})
    .getMany();
    if(!findalldataByPurpose){
        return ;
    }
    else{
    return findalldataByPurpose;
    }
}
async find_data_From_Purpose(purpose:string):Promise<Addproperty[]>{
    const findDataByAreaUnit=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city","city")
    .leftJoinAndSelect("addproperty.Location","Location")
    .leftJoinAndSelect("addproperty.bathroom","bathroom")
    .leftJoinAndSelect("addproperty.area_unit","area_unit")
    .leftJoinAndSelect("addproperty.bed","bed")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.purpose=:purpose",{purpose:purpose})
    .andWhere("addproperty.expiredate >:expiredate",{expiredate:this.date})
    .getMany();
    return findDataByAreaUnit;
}
}
