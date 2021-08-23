import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { Project } from "./project.entity";

@Entity()
export class Projectimage{
    @PrimaryGeneratedColumn()
    propertyimage_id:number;

    @Column()
    imageurl:string;

    @Column()
    image_type:string;

    @ManyToOne(()=>Project,project=>project.project_image,{onDelete:"CASCADE"})
    @JoinColumn({name:"project_id"})
    project:Project;
}