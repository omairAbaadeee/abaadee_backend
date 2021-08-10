import { Partner } from "src/entity/paetner.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Partner)
export class PartnerRepository extends Repository<Partner>{

}