import { Project_Aminities } from "src/entity/project_aminities.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Project_Aminities)
export class Project_AminitiesRepository extends Repository<Project_Aminities>{

}