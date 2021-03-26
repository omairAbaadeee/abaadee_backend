import { Purpose } from "src/entity/addproperty.entity";

export class Addpropertydto{
    id: number;
    username:string;
    purpose: Purpose;
    property_type: string;
    property_category: string;
    city_name: string;
    location_name: string;
    property_title: string;
    property_description: string;
    price: number;
    land_area: number;
    area_unit_name: string;
    bed: number;
    //propertyimage:Addimagedto;
    bathroom: number;
    expire_date: Date;
  
}
export class Addimagedto{
    filename:string;
}
export class FindPropertyFromLocation{
    Lname:string;
}
export class FindPropertyFromLocationAndPropertycatogory{
    Lname:string;
    propertycatogoryname:string;
}
export class FacebookUser{
    user:string;
    }