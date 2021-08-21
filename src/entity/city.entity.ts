import { from } from "rxjs";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity"
import { Addproperty } from "./addproperty.entity";
import { User } from "./user.entity";
import { Country } from "./country.entity";
import { Project } from "./project.entity";

import { Developer } from "./developer.entity";
import { Agent } from "./agent.entity";



@Entity()
export class City {
    @PrimaryGeneratedColumn()
    city_id:number;

    @Column()
    city_name:string;

@ManyToOne(()=>Country,country=>country.city)
country:Country;


    @OneToMany(type => Location, location => location.city)
    location: Location[];

    @OneToMany(()=>Addproperty,addproperty=>addproperty.city)
    addproperty:Addproperty[];

    @OneToMany(()=>User,user=>user.city)
    user:User[];

    @OneToMany(()=>Project,project=>project.city)
    project:Project[];
    @OneToMany(()=>Agent,agent=>agent.city)
    agent:Agent[];
    @OneToMany(()=>Developer,developer=>developer.city)
    developer:Developer[];

}