import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Addimagedto, Addpropertydto } from 'src/dto/addproerty.dto';
import { Addproperty } from 'src/entity/addproperty.entity';
import { Propertyimage } from 'src/entity/propertyimage.entity';
import { User } from 'src/entity/user.entity';
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
    ) { }


    async addproperty(addpropertydto: Addpropertydto,user:User,images:Addimagedto[]) {

        const { purpose, property_title, property_description, land_area,  
         area_unit_name,
        bed,
        bathroom, property_type,
        property_category,
        city_name,
        location_name, price } = addpropertydto;
   
       

        const createdat =new Date();
        const updateddat=new  Date();
        const expiredate=Date().toString();
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


      
      
        const findcity = await this.cityrepo.findOne(city_name);
        addproperty.city_id = findcity;
        //console.log(findcity);
        const findlocation = await this.locationrepo.findOne(location_name);
        addproperty.Location_id = findlocation;
        //console.log(findlocation);
        const findbeds = await this.bedsrepo.findOne(bed);
        addproperty.bed_id = findbeds;
        //console.log(findbeds);
        const findbaths = await this.bathrepo.findOne(bathroom);
        addproperty.bathroom_id = findbaths;
        //console.log(findbaths);
        const findareaunit = await this.areaunitrepo
           .createQueryBuilder("areaofunit")
           .where("areaofunit.area_name = :area_name", { area_name: area_unit_name })
           .getOne();
        // const findareaunit = await this.areaunitrepo.findOne({areaunitname});
        addproperty.area_unit_id = findareaunit;
        //console.log(findareaunit);

        const findprosubtype = await this.propertycatogoryrepo
        .createQueryBuilder("propertycatogoryname")
        .where("propertycatogoryname.property_category_name = :property_category_name", { property_category_name: property_category })
        .getOne();
       // const findprosubtype = await this.propertycatogoryrepo.findOne(propertysubtype);
        addproperty.propertysubtype = findprosubtype;
        //console.log(findprosubtype);
        

        const findprotype = await this.propertytyperepo
        .createQueryBuilder("propertytype")
        .where("propertytype.property_type_name = :property_type_name", { property_type_name: property_type })
        .getOne();
        //const findprotype = await this.propertytyperepo.findOne(propertytype);
        addproperty.propertytype = findprotype;
        //console.log(findprotype);
        

         
        // const finduser = await this.userRepository
        // .createQueryBuilder("user")
        // .where("user.name = :name", { name: username })
        // .getOne();
        //const finduser = await this.userRepository.findOne(username);
        //console.log(finduser);
        addproperty.userid = user;
        

        // images.forEach(async element=>{

        //     const findimage = await this.proimageRepository
        //     .createQueryBuilder("image")
        //     .where("image.imageurl = :imageurl", { imageurl: element.filename })
        //     .getOne();
        //       addproperty.images=[findimage];
         
        // })
       // addproperty.images=[]
        
         await this.addpropertyrepo.save(addproperty);
         
         this.addimage(images,addproperty);


    }

    async addimage(images:Addimagedto[],propertyid:Addproperty){

       
    images.forEach(async element=>{
        const propertyimage=new Propertyimage();
        propertyimage.imageurl=element.filename;
        propertyimage.addproperty=propertyid;
        await this.proimageRepository.save(propertyimage); 
    })
                
  
}
    async getalldata():Promise<Addproperty[]>{
    const findalldata=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.propertysubtype","propertysubtype")
    .getMany();
    // console.log(findalldata);
    //  const findalldata= await this.proimageRepository.createQueryBuilder("images")
    //  .leftJoinAndSelect("images.addproperty","addproperty").getMany();
    //  console.log(findalldata)
     return findalldata;    
}
async find_data_From_cityname(Cname:string):Promise<Addproperty[]>{
    const findDataByCity=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("city_id.city_name=:city_name",{city_name:Cname})
    .getMany();
    if(!findDataByCity){
        return ;
    }
    else{
    return findDataByCity;
    }
    
}
//FindWithLocationName//
    async find_data_From_locationname(lname:string):Promise<Addproperty[]>{
    const findDataByLocation=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("Location_id.location_name =:location_name",{location_name:lname})
    .getMany();
    if(!findDataByLocation){
        return ;
    }
    else{
    return findDataByLocation;
    }
    
}
//FindWithBathroomQuantity//
async find_data_From_Bathroom(BathroomNumber:Number):Promise<Addproperty[]>{
    const findDataByBathroom=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("bathroom_id.bathroom_quantity =:bathroom_quantity",{bathroom_quantity:BathroomNumber})
    .getMany();
    if(!findDataByBathroom){
        return ;
    }
    else{
    return findDataByBathroom;
    }
}
//FindByAreaUnit
async find_data_From_AreaUnit(AreaUnitname:string):Promise<Addproperty[]>{
    const findDataByAreaUnit=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("area_unit_id.area_name =:area_name",{area_name:AreaUnitname})
    .getMany();
    return findDataByAreaUnit;
}
//FindByBed//
async find_data_From_Bed(BedNumber:Number):Promise<Addproperty[]>{
    const findDataByBed=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("bed_id.beds_quantity =:beds_quantity",{beds_quantity:BedNumber})
    .getMany();
    if(!findDataByBed){
        return ;
    }
    else{
    return findDataByBed;
    }
}


//FindByPropertyType//
async find_data_From_PropertyType(PropertyTypeName:string):Promise<Addproperty[]>{
    const findDataByPropertyType=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("property_type.property_type_name =:property_type_name",{property_type_name:PropertyTypeName})
    .getMany();
    if(!findDataByPropertyType){
        return ;
    }
    else{
    return findDataByPropertyType;
    }
}
//FindByPropertySubType//
async find_data_From_PropertySubType(property_category:string):Promise<Addproperty[]>{
    const findDataByproperty_category=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("property_category.property_category_name =:property_category_name",{property_category_name:property_category})
    .getMany();
    if(!findDataByproperty_category){
        return ;
    }
    else{
    return findDataByproperty_category;
    }
}

//FindDataFromCityname,Locationname//

async find_data_From_Cityname_Locationname(Cname:string  , lname:string):Promise<Addproperty[]>{
    const findonedatabyCity_Location=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("cityid.cityname =:cityname",{cityname:Cname})
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .getMany();
    if(!findonedatabyCity_Location){
        return null;
    }
    else{
    return findonedatabyCity_Location;
    }
}
//FindDataFromCityname,Locationname,BathroomNumber//

async find_data_From_Cityname_Locationname_BathroomNumber(Cname:string  , lname:string , BathroomNumber:number):Promise<Addproperty[]>{
    const findonedatabyCity_Location_Bathroom=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("cityid.cityname =:cityname",{cityname:Cname})
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .where("bathroomid.bathroom_quaintity =:bathroom_quaintity",{bathroom_quaintity:BathroomNumber})

    .getMany();
    if(!findonedatabyCity_Location_Bathroom){
        return ;
    }
    else{
    return findonedatabyCity_Location_Bathroom;
    }
}
//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit//

async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit(Cname:string  , lname:string , BathroomNumber:number , AreaUnitname:string):Promise<Addproperty[]>{
    const findonedatabyCity_Location_Bathroom_AreaUnit=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("cityid.cityname =:cityname",{cityname:Cname})
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .where("bathroomid.bathroom_quaintity =:bathroom_quaintity",{bathroom_quaintity:BathroomNumber})
    .where("areaunitid.area_name =:area_name",{area_name:AreaUnitname})


    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit){
        return ;
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit;
    }
}

//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit,BedNumber//

async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber(Cname:string  , lname:string , BathroomNumber:number , AreaUnitname:string , BedNumber:number  ):Promise<Addproperty[]>{
    const findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("cityid.cityname =:cityname",{cityname:Cname})
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .where("bathroomid.bathroom_quaintity =:bathroom_quaintity",{bathroom_quaintity:BathroomNumber})
    .where("areaunitid.area_name =:area_name",{area_name:AreaUnitname})
    .where("bedid.beds_quaintity =:beds_quaintity",{beds_quaintity:BedNumber})




    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber){
        return ;
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber;
    }
}

//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit,BedNumber,PropertyType//


async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType(Cname:string  , lname:string , BathroomNumber:number , AreaUnitname:string , BedNumber:number , PropertyTypeName:string  ):Promise<Addproperty[]>{
    const findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("cityid.cityname =:cityname",{cityname:Cname})
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .where("bathroomid.bathroom_quaintity =:bathroom_quaintity",{bathroom_quaintity:BathroomNumber})
    .where("areaunitid.area_name =:area_name",{area_name:AreaUnitname})
    .where("bedid.beds_quaintity =:beds_quaintity",{beds_quaintity:BedNumber})
    .where("propertytype.property_type_name =:property_type_name",{property_type_name:PropertyTypeName})





    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType){
        return ;
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType;
    }
}



//FindDataFromCityname,Locationname,BathroomNumber,AreaUnit,BedNumber,PropertyType,PropertySubType//
async find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType_PropertySubType(Cname:string  , lname:string , BathroomNumber:number , AreaUnitname:string , BedNumber:number , PropertyTypeName:string , property_category ):Promise<Addproperty[]>{
    const findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType_PropertySubType=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("cityid.cityname =:cityname",{cityname:Cname})
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .where("bathroomid.bathroom_quaintity =:bathroom_quaintity",{bathroom_quaintity:BathroomNumber})
    .where("areaunitid.area_name =:area_name",{area_name:AreaUnitname})
    .where("bedid.beds_quaintity =:beds_quaintity",{beds_quaintity:BedNumber})
    .where("propertytype.property_type_name =:property_type_name",{property_type_name:PropertyTypeName})
    .where("property_category.property_category_name =:property_category_name",{property_category_name:property_category})

    .getMany();
    if(!findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType_PropertySubType){
        return ;
    }
    else{
    return findonedatabyCity_Location_Bathroom_AreaUnit_BedNumber_PropertyType_PropertySubType;
    }
}


    

async getalldataByPurpose(purpose:string):Promise<Addproperty[]>{
    const findalldataByPurpose=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.city_id","city_id")
    .leftJoinAndSelect("addproperty.Location_id","Location_id")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.property_type","property_type")
    .leftJoinAndSelect("addproperty.property_category","property_category")
    .where("addproperty.purpose=:purpose", {purpose:purpose})
    .getMany();
    if(!findalldataByPurpose){
        return ;
    }
    else{
    return findalldataByPurpose;
    }
}
}
