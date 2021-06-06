import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Developer } from "./developer.entity";

@Entity()
export class MemberList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    member_list_name:string;

    @ManyToOne(() => Developer,developer=>developer.memberlist)
    @JoinColumn({name:"developer_id"})
    developer: Developer;
}