import { Column, Entity, JoinColumn,  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Areaofunit } from "./area_unit.entity";
import { City } from "./city.entity";
import { User } from "./user.entity";
import { Location } from "./location.entity";
import { PropertyCategory } from "./property_category.entity";
import { PropertyType } from "./property_type.entity";
import { Propertyimage } from "./propertyimage.entity";
import { Features } from "./features.entity";
import { General_Information } from "./featureGeneralInfo.entity";

export enum Purpose {
    ForSale = "Sale",
    Rent = "Rent",
    Wanted = "Wanted",
    Project="Project"
}

@Entity()
export class Addproperty {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User,userid=>userid.addproperty)
    @JoinColumn({name:"user_id"})
    userid:User;
    
    @Column()
    purpose: Purpose;

    @Column()
    latitude: string;
    
    @Column()
    longitude: string;
    
    @ManyToOne(()=>PropertyType,propertytype=>propertytype.addproperty)
    @JoinColumn({name:"property_type_id"})
    property_type: PropertyType;
    
    @ManyToOne(() => PropertyCategory,propertycatogory=>propertycatogory.addproperty)
    @JoinColumn({name:"property_category_id"})
    property_category: PropertyCategory;

    
    @ManyToOne(() => City,city=>city.addproperty)
    @JoinColumn({name:"city_id"})
    city: City;
    
    @ManyToOne(() => Location,location=>location.addproperty)
    @JoinColumn({name:"location_id"})
    Location: Location;
    
    @Column()
    property_title: string;
    
    @Column()
    property_description: string;
    
    @Column()
    price: number;
    
    @Column()
    land_area: number;

    @Column()
    title_image: string;

    @Column()
    is_verified: boolean;

    @ManyToOne(() => Areaofunit,areaofunit=>areaofunit.addproperty)
    @JoinColumn({name:"area_unit_id"})
    area_unit: Areaofunit;


    @OneToMany(()=>Propertyimage,images=>images.addproperty)
    @JoinColumn({name:"image_id"})
    images: Propertyimage[];
    
    
    @OneToMany(()=>Features,feature=>feature.addproperty)
    @JoinColumn({name:"feature_id"})
    feature: Features[];

    @OneToMany(()=>General_Information,general_info=>general_info.addproperty)
    @JoinColumn({name:"general_info_id"})
    general_info: General_Information;

    @Column()
    expiredate: Date;
    
    @Column()
    createdat: Date;
    
    @Column()
    updatedat:Date;
}