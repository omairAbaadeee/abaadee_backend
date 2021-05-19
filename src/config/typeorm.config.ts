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


export const typeOrmConfig:TypeOrmModuleOptions = {
type:'postgres',
host:'localhost',
port:5432,
username:'postgres',
password:'admin654321',
database:'abaadeeserver1',
entities:[User,Areaofunit,Country,Location,City
    ,PropertyCategory,PropertyType,Addproperty,Propertyimage,Features,General_Information],
synchronize:true
};