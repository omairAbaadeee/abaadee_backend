import { Projectimage } from "src/entity/projectimage.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Projectimage)
export class ProjectimageRepository extends Repository<Projectimage>{

}