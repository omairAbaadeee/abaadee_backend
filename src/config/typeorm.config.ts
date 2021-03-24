import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Addproperty } from "src/entity/addproperty.entity";
import { AreaSize } from "src/entity/area_size.entity";
import { Areaofunit } from "src/entity/area_unit.entity";
import { Bathrooms } from "src/entity/bathroom.entity";
import { Beds } from "src/entity/beds.entity";
import { City } from "src/entity/city.entity";
import { Price } from "src/entity/price.entity";
import { PropertyCategory } from "src/entity/property_category.entity";
import { PropertyType } from "src/entity/property_type.entity";
import { User } from "src/entity/user.entity";
import {Location} from "src/entity/location.entity";
import { Propertyimage } from "src/entity/propertyimage.entity";
import { Country } from "src/entity/country.entity";


export const typeOrmConfig:TypeOrmModuleOptions = {
type:'postgres',
host:'localhost',
port:5432,
username:'postgres',
password:'ahmed123',
database:'abaadee',
entities:[User,Price,Beds,Bathrooms,AreaSize,Areaofunit,Country,Location,City
    ,PropertyCategory,PropertyType,Addproperty,Propertyimage],
synchronize:true
};