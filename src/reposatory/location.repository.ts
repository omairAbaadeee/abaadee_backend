import { Location } from "src/entity/location.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Location)
export class LocationRepository extends Repository<Location>{

}