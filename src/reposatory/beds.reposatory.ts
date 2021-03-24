import { Beds } from "src/entity/beds.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Beds)
export class BedsRepositery extends Repository<Beds>{
    
}