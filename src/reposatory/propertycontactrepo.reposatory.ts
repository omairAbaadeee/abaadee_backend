import { PropertyContact } from "src/entity/propertycontact.entity";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PropertyContact)
export class PropertyContactReposatory extends Repository<PropertyContact>{
    
}