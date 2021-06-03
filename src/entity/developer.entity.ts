import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { City } from "./city.entity";
import { Project } from "./project.entity";



@Entity()
export class Developer {
@PrimaryGeneratedColumn()
developer_id: number;

@Column()
image: string;

@Column()
name: string;
@Column()
address: string;
@Column()
number: number;
@Column()
email: string;
@Column()
office_number: number;
@Column()
description: string;
@Column()
rating: string;
@Column(
    {
        nullable:true
    }
)
facebook_link: string;
@Column({
    nullable:true
})
youtube_link: string;
@Column({
    nullable:true
})
twitter_link: string;
@Column({
    nullable:true
})
linkdin_link: string;
@Column({
    nullable:true
})
insta_ink: string;
@Column({
    nullable:true
})
other_link: string;
@Column({
    nullable:true
})
vedio_link: string;

@OneToMany(()=>Project,project=>project.developer)
project:Project[];

}