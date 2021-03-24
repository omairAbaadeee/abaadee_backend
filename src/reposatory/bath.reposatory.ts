import { Bathrooms } from "src/entity/bathroom.entity";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Bathrooms)
export class BathRepositery extends Repository<Bathrooms>{
    
}