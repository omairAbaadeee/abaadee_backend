import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class Propertyimage{
    @PrimaryGeneratedColumn()
    propertyimage_id:number;

    @Column()
    imageurl:string;

    @ManyToOne(()=>Addproperty,addproperty=>addproperty.images)
    addproperty:Addproperty;
}