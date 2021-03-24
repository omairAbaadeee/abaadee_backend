import { Areaofunit } from "src/entity/area_unit.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Areaofunit)
export class AreaofunitRepositery extends Repository<Areaofunit>{
    
}