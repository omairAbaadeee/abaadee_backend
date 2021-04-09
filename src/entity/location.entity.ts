import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { City } from "./city.entity";
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

}