import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { City } from "./city.entity";
import { Developer } from "./developer.entity";
import {Location} from "./location.entity";
import { Projectimage } from "./projectimage.entity";



@Entity()
export class Project {
    @PrimaryColumn()
    project_id:number;

    @Column()
    total_area:number;
    
    @Column()
    project_type:string;
    
    @Column()
    price:string;

    @Column()
    payment_option:string;
    
    @Column()
    completion_year:string;
    
    @Column()
    project_logo_image:string;

    
    @Column()
    description:string;
    
    @Column()
    latitude:number;
    
    @Column()
    longitude:number;

    @Column()
    flor_plan_images:string;
    
   

   

    @ManyToOne(() => City,city=>city.project)
    @JoinColumn({name:"city_id"})
    city: City;

    @ManyToOne(() => Location,location=>location.project)
    @JoinColumn({name:"location_id"})
    location: Location;

    @ManyToOne(() => Developer,developer=>developer.project)
    @JoinColumn({name:"developer_id"})
    developer: Developer;
  

    @OneToMany(()=>Projectimage,project_image=>project_image.project)
    project_image:Projectimage[];
}