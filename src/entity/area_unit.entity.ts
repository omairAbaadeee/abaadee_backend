import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class Areaofunit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    area_name: string;

    @OneToMany(()=>Addproperty,addproperty=>addproperty.area_unit_id)
    addproperty:Addproperty[];
}