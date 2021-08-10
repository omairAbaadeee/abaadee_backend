import { Addproperty } from "src/entity/addproperty.entity";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Addproperty)
export class AddpropertyRepo extends Repository<Addproperty>{
    
}