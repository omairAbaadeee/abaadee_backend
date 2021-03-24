import { Purpose } from "src/entity/addproperty.entity";

export class Addpropertydto{
    id: number;
    username:string;
    purpose: Purpose;
    propertytype: string;
    propertysubtype: string;
    cityname: string;
    locationname: string;
    propertytitle: string;
    propertydescription: string;
    price: number;
    landarea: number;
    areaunitname: string;
    bed: number;
    //propertyimage:Addimagedto;
    bathroomid: number;
    expiredate: Date;
  
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