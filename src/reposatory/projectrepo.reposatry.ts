
import { Project } from "src/entity/project.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Project)
export class ProjectRepository extends Repository<Project>{

}