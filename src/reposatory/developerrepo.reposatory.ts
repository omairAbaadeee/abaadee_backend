import { Developer } from "src/entity/developer.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Developer)
export class DeveloperRepository extends Repository<Developer>{

}