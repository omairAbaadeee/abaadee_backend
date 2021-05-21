import { Purpose } from "src/entity/addproperty.entity";

export class Addpropertydto{
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
    //propertyimage:Addimagedto;
    title_image:string;
    features:string;
    wanted_for:string;
    latitude:string;
    longitude:string;
  
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