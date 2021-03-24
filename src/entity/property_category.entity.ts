
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { PropertyType } from "./property_type.entity";

@Entity()
export class PropertyCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    property_category_name: string;
   
    @OneToMany(()=>Addproperty,addproperty=>addproperty.propertysubtype)
    addproperty:Addproperty[];
    
    @ManyToOne(type => PropertyType, type => type.property)
    type: PropertyType;
}