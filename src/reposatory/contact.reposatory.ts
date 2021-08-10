import { Contact } from "src/entity/contact.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact>{

}