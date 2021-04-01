import { StreamPriorityOptions } from "node:http2";
import { Purpose } from "src/entity/addproperty.entity";

export class AddpropertySearch{
purpose:Purpose;
city_name:string;
location_name:string;
property_catogory:string;
min_price:string;
max_price:string;
min_area:string;
max_area:string;
beds:string;
area_unit_name:string;
}