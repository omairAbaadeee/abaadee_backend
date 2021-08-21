import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { City } from "./city.entity";
import { Project } from "./project.entity";
import { MemberList } from "./memberlist.entity";
import {Location} from "./location.entity"

@Entity()
export class Developer {
@PrimaryGeneratedColumn()
developer_id: number;

@Column()
image: string;

@Column()
logo_image: string;

@Column()
name: string;
@Column()
address: string;
@Column()
p_number: string;
@Column()
email: string;
@Column()
office_number: string;
@Column()
description: string;
@Column()
rating: string;

@Column(
    {
        //nullable:true
    }
)
facebook_link: string;
@Column({
  //  nullable:true
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

@OneToMany(()=>MemberList,memberlist=>memberlist.developer)
memberlist: MemberList[];

@OneToMany(()=>Project,project=>project.developer)
project:Project[];

@ManyToOne(() => City,city=>city.addproperty)
@JoinColumn({name:"city_id"})
city: City;

@ManyToOne(() => Location,location=>location.developer)
@JoinColumn({name:"location_id"})
Location: Location;
}