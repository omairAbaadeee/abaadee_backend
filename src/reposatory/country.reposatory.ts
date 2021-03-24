import { Country } from "src/entity/country.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Country)
export class CountryRepository extends Repository<Country>{

}