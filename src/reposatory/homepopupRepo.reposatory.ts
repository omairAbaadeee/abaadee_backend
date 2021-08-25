import { Homepopup } from "src/entity/popup.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Homepopup)
export class HomepopupReposatory extends Repository<Homepopup>{

}