import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class Bathrooms {

    @PrimaryGeneratedColumn()
    Bathroom_id: number;

    @Column()
    bathroom_quantity: number;
    
    @OneToMany(()=>Addproperty,addproperty=>addproperty.bathroom)
    addproperty:Addproperty[];
}