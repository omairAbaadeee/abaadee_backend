import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

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
    other_link: string;
    
    @Column()
    image: string;

    
    @Column()
    video_link: string;


}
