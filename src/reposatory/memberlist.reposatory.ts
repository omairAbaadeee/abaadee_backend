import { MemberList } from "src/entity/memberlist.entity";
import {  EntityRepository, Repository } from "typeorm";


@EntityRepository(MemberList)
export class MemberlistRepository extends Repository<MemberList>{

}