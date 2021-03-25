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

        const { purpose, propertytitle, propertydescription, landarea,  
         areaunitname,
        bed,
        bathroomid, propertytype,
        propertysubtype,
        cityname,
        locationname, price } = addpropertydto;
   
       

        const createdat =new Date();
        const updateddat=new  Date();
        const expiredate=Date().toString();
        const addproperty = new Addproperty();
        

        
        addproperty.purpose = purpose;
        //console.log(purpose);
        addproperty.createdat = createdat;
        //console.log(createdat);
        addproperty.property_title = propertytitle;
        //console.log(propertytitle);
        addproperty.property_description = propertydescription;
        //console.log(propertydescription);
        addproperty.land_area = landarea;
        //console.log(landarea);
        addproperty.price = price;
        //console.log(price);
        addproperty.updatedat=updateddat;
        //console.log(updateddat);
        addproperty.expiredate=expiredate;
        //console.log(expiredate);


      
      
        const findcity = await this.cityrepo.findOne({cityname});
        addproperty.city_id = findcity;
        //console.log(findcity);
        const findlocation = await this.locationrepo.findOne({ locationname });
        addproperty.Location_id = findlocation;
        //console.log(findlocation);
        const findbeds = await this.bedsrepo.findOne(bed);
        addproperty.bed_id = findbeds;
        //console.log(findbeds);
        const findbaths = await this.bathrepo.findOne(bathroomid);
        addproperty.bathroom_id = findbaths;
        //console.log(findbaths);
        const findareaunit = await this.areaunitrepo
           .createQueryBuilder("areaofunit")
           .where("areaofunit.area_name = :area_name", { area_name: areaunitname })
           .getOne();
        // const findareaunit = await this.areaunitrepo.findOne({areaunitname});
        addproperty.area_unit_id = findareaunit;
        //console.log(findareaunit);

        const findprosubtype = await this.propertycatogoryrepo
        .createQueryBuilder("propertycatogoryname")
        .where("propertycatogoryname.property_category_name = :property_category_name", { property_category_name: propertysubtype })
        .getOne();
       // const findprosubtype = await this.propertycatogoryrepo.findOne(propertysubtype);
        addproperty.propertysubtype = findprosubtype;
        //console.log(findprosubtype);
        

        const findprotype = await this.propertytyperepo
        .createQueryBuilder("propertytype")
        .where("propertytype.property_type_name = :property_type_name", { property_type_name: propertytype })
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
    async find_data_From_Cityname(lname:string):Promise<Addproperty[]>{
    const findonedata=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroomid","bathroomid")
    .leftJoinAndSelect("addproperty.areaunitid","areaunitid")
    .leftJoinAndSelect("addproperty.bedid","bedid")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.propertysubtype","propertysubtype")
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .getMany();
    return findonedata;
}
async find_data_From_Locationname_Propertycatogory(lname:string,propertycatogory:string):Promise<Addproperty[]>{
    const findonedata1=await this.addpropertyrepo.createQueryBuilder("addproperty")
    .leftJoinAndSelect("addproperty.images","images")
    .leftJoinAndSelect("addproperty.cityid","cityid")
    .leftJoinAndSelect("addproperty.Locationid","Locationid")
    .leftJoinAndSelect("addproperty.bathroom_id","bathroom_id")
    .leftJoinAndSelect("addproperty.area_unit_id","area_unit_id")
    .leftJoinAndSelect("addproperty.bed_id","bed_id")
    .leftJoinAndSelect("addproperty.propertytype","propertytype")
    .leftJoinAndSelect("addproperty.propertysubtype","propertysubtype")
    .where("Locationid.locationname =:locationname",{locationname:lname})
    .where("propertysubtype.property_category_name =:property_category_name",{property_category_name:propertycatogory})
    .getMany();
    if(!findonedata1){
        return ;
    }
    else{
    return findonedata1;
    }
}
    

} 
