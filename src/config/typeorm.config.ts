import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Addproperty } from "src/entity/addproperty.entity";
import { Areaofunit } from "src/entity/area_unit.entity";
import { City } from "src/entity/city.entity";
import { PropertyCategory } from "src/entity/property_category.entity";
import { PropertyType } from "src/entity/property_type.entity";
import { User } from "src/entity/user.entity";
import {Location} from "src/entity/location.entity";
import { Propertyimage } from "src/entity/propertyimage.entity";
import { Country } from "src/entity/country.entity";
import { Features } from "src/entity/features.entity";
import { General_Information } from "src/entity/featureGeneralInfo.entity";
import { Contact } from "src/entity/contact.entity";
import { PropertyContact } from "src/entity/propertycontact.entity";
import { Advertisement } from "src/entity/advertisement.entity";
import { Projectimage } from "src/entity/projectimage.entity";
import { Project } from "src/entity/project.entity";
import { Developer } from "src/entity/developer.entity";
import { MemberList } from "src/entity/memberlist.entity";
import { Partner } from "src/entity/paetner.entity";
import { FeatureAgency } from "src/entity/featureagency.entity";
import { Blog } from "src/entity/blog.entity";
import { BlogImage } from "src/entity/blogimage.entity";
import { Project_Aminities } from "src/entity/project_aminities.entity";

export const typeOrmConfig:TypeOrmModuleOptions = {
type:'postgres',
host:'localhost',
port:5432, 
username:'postgres',
password:'abc123',
database:'Abaadee.com',
entities:[User,Areaofunit,Country,Location,City
    ,PropertyCategory,PropertyType,Addproperty,Propertyimage,Features,General_Information,
    Advertisement,Contact,PropertyContact,Projectimage,Project,Developer,MemberList,Blog,BlogImage
    ,Partner,FeatureAgency,Project_Aminities],
synchronize:true
};