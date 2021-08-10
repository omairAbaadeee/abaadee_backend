import { Propertyimage } from "src/entity/propertyimage.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Propertyimage)
export class PropertyimagesRepositery extends Repository<Propertyimage>{
    
}