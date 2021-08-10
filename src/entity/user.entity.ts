import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
import { Addproperty } from "./addproperty.entity";
import { City } from "./city.entity";
import {Location} from "./location.entity";
import { Country } from "./country.entity";
import { PropertyContact } from "./propertycontact.entity";
@Entity()
@Unique(["email"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({nullable:true})
    phone_number:string;
    
    @Column({nullable:true})
    imageurl:string;

    @ManyToOne(() => City,city=>city.user)
    city:City;

    @ManyToOne(() => Location,location=>location.user)
    location:Location;
    
    @Column()
    is_active:boolean;
    
    @Column({default:false})
    is_verified:boolean;
    
    @Column()
    created_at:Date;
    

    
    @Column()
    salt:string;


    @OneToMany(()=>Addproperty,addproperty=>addproperty.userid)
    addproperty:Addproperty[];
    
    @ManyToOne(()=>Country,country=>country.city)
    country:Country;

    
    @OneToMany(()=>PropertyContact,propertycontact=>propertycontact.user)
    @JoinColumn({name:"property_contact"})
    propertycontact:PropertyContact[];
    
   
    
}