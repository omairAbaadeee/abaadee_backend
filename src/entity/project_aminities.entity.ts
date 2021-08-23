import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Project_Aminities {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    feature_name:string;
    @Column()
    Category_name:string;
    @ManyToOne(() => Project,project=>project.project_aminities,{onDelete:"CASCADE"})
    @JoinColumn({name:"Project_id"})
    project: Project;
}