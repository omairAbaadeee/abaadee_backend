import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { Agent } from "./agent.entity";
import { City } from "./city.entity";
import { Developer } from "./developer.entity";
import { Project } from "./project.entity";
import { User } from "./user.entity";


@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    location_name:string;

    @ManyToOne(type => City, city => city.location)
    city: City;
    @OneToMany(()=>Addproperty,addproperty=>addproperty.Location)
    addproperty:Addproperty[];

    @OneToMany(()=>User,user=>user.location)
    user:User[];

    @OneToMany(()=>Project,project=>project.location)
    project:Project[];

    @OneToMany(()=>Agent,agent=>agent.location)
    agent:Agent[];

    @OneToMany(()=>Developer,developer=>developer.Location)
    developer:Developer[];

}