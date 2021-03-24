import { Column, Entity,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { PropertyCategory } from "./property_category.entity";

@Entity()
export class PropertyType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    property_type_name: string;

    @OneToMany(type => PropertyCategory, property => property.type)
    property: PropertyCategory[];

    @OneToMany(()=>Addproperty,addproperty=>addproperty.propertytype)
    addproperty:Addproperty[];
}