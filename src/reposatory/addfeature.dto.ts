import { Features } from "src/entity/features.entity";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Features)
export class AddfeatureReposatory extends Repository<Features>{
    
}