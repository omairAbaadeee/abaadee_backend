import { General_Information } from "src/entity/featureGeneralInfo.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(General_Information)
export class General_Info_Repository extends Repository<General_Information>{

}