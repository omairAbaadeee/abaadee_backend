import { Column, Entity, JoinColumn,  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Areaofunit } from "./area_unit.entity";
import { Bathrooms } from "./bathroom.entity";
import { Beds } from "./beds.entity";
import { City } from "./city.entity";
import { User } from "./user.entity";
import { Location } from "./location.entity";
import { PropertyCategory } from "./property_category.entity";
import { PropertyType } from "./property_type.entity";
import { Propertyimage } from "./propertyimage.entity";

export enum Purpose {
    ForSale = "Buy",
    Rent = "Rent",
    Wanted = "Wanted",
    Project="Project"
}

@Entity()
export class Addproperty {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User,userid=>userid.addproperty)
    userid:User;
    
    @Column()
    purpose: Purpose;
    
    @ManyToOne(()=>PropertyType,propertytype=>propertytype.addproperty)
    @JoinColumn()
    property_type: PropertyType;
    
    @ManyToOne(() => PropertyCategory,propertycatogory=>propertycatogory.addproperty)
    @JoinColumn()
property_category: PropertyCategory;

    
    @ManyToOne(() => City,city=>city.addproperty)
    @JoinColumn()
    city_id: City;
    
    @ManyToOne(() => Location,location=>location.addproperty)
    @JoinColumn()
    Location_id: Location;
    
    @Column()
    property_title: string;
    
    @Column()
    property_description: string;
    
    @Column()
    price: number;
    
    @Column()
    land_area: number;

    @ManyToOne(() => Areaofunit,areaofunit=>areaofunit.addproperty)
    @JoinColumn()
    area_unit_id: Areaofunit;

    @ManyToOne(() => Beds,beds=>beds.addproperty)
    @JoinColumn()
    bed_id: Beds;


    @ManyToOne(() => Bathrooms,bathrooms=>bathrooms.addproperty)
    @JoinColumn()
    bathroom_id: Bathrooms;

    @OneToMany(()=>Propertyimage,images=>images.addproperty)
    @JoinColumn()
    images: Propertyimage[];
    
    @Column()
    expiredate: Date;
    
    @Column()
    createdat: Date;
    
    @Column()
    updatedat:Date;
}