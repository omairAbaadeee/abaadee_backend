import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
import { Addproperty } from "./addproperty.entity";
import { City } from "./city.entity";
import {Location} from "./location.entity";
@Entity()
//@Unique(["email"])//
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    phone_number:string;

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


    async validatPassword(password:string){
        const hash= await bcrypt.hash(password,this.salt);
        return hash==this.password;
    }
    
}