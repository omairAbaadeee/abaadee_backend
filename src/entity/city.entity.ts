import { from } from "rxjs";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity"
import { Addproperty } from "./addproperty.entity";
import { User } from "./user.entity";
import { Country } from "./country.entity";



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

}