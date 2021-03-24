
import { PropertyType } from "src/entity/property_type.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PropertyType)
export class PropertytypeRepositery extends Repository<PropertyType>{
    
}