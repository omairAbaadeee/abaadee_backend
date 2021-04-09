import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class Beds {

    @PrimaryGeneratedColumn()
    bed_id: number;

    @Column()
    beds_quantity: number;
    
    @OneToMany(()=>Addproperty,addproperty=>addproperty.bed)
    addproperty:Addproperty[];
}