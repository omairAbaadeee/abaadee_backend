import { FeatureAgency } from "src/entity/featureagency.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(FeatureAgency)
export class FeatureAgencyRepository extends Repository<FeatureAgency>{

}