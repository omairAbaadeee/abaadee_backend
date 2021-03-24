import { City } from "src/entity/city.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(City)
export class CityRepository extends Repository<City>{

}