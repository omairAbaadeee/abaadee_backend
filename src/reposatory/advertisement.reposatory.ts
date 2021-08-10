import { Advertisement } from "src/entity/advertisement.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Advertisement)
export class AdvertisementReposatory extends Repository<Advertisement>{
    
}