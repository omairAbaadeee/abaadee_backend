import { PropertyCategory } from "src/entity/property_category.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PropertyCategory)
export class PropertyCategoryRepositery extends Repository<PropertyCategory>{
    
}