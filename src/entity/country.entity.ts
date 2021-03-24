import { from } from "rxjs";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { City } from "./city.entity";



@Entity()
export class Country {
    @PrimaryColumn()
    country_id:number;

    @Column()
    country_sort_name:string;
    
    @Column()
    country_name:string;
    
    @Column()
    phone_code:number;

   

    @OneToMany(type => City, city => city.country)
    city: City[];

    


  

    @OneToMany(()=>User,user=>user.country)
    user:User[];

}