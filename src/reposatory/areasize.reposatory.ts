import { AreaSize } from "src/entity/area_size.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(AreaSize)
export class AreasizeRepositery extends Repository<AreaSize>{
    
}