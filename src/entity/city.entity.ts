import { from } from "rxjs";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity"
import { Addproperty } from "./addproperty.entity";
import { User } from "./user.entity";



@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    cityname:string;



    @OneToMany(type => Location, location => location.city)
    location: Location[];

    @OneToMany(()=>Addproperty,addproperty=>addproperty.city_id)
    addproperty:Addproperty[];

    @OneToMany(()=>User,user=>user.city)
    user:User[];

}