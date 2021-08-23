import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Developer } from "./developer.entity";

@Entity()
export class MemberListLogo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    member_list_logo:string;

    @ManyToOne(() => Developer,developer=>developer.memberlist,{onDelete:"CASCADE"})
    @JoinColumn({name:"developer_id"})
    developer: Developer;
}