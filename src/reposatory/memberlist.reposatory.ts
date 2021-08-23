import { MemberListLogo } from "src/entity/developermemberlogo.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(MemberListLogo)
export class MemberlistRepository extends Repository<MemberListLogo>{

}