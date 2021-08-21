import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { City } from "./city.entity";
import {Location} from "./location.entity"

@Entity()
export class Agent{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: String;
    
    @Column()
    address: string;
    
    @Column()
    number: string;
    
    @Column()
    email: String;

    @Column()
    office_no: string;
    
    @Column()
    description: string;
    
    @Column()
    agent_rating: string;
    
    @Column()
    fb_link: string;
    
    @Column()
    twitter_link: string;
    
    @Column()
    linkdin_link: string;
    @Column()

    insta_link: string;
    @Column()
    
    youtube_link: string;
    
    @Column()
    other_link: string;
    
    @Column()
    image: string;

    @Column()
    logo_image: string;

    
    @Column()
    video_link: string;
    @ManyToOne(() => City,city=>city.agent)
    @JoinColumn({name:"city_id"})
    city: City;
    
    @ManyToOne(() => Location,location=>location.agent)
    @JoinColumn({name:"location_id"})
    Location: Location;

}
