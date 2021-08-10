import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class Features {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    feature_name:string;
    @Column()
    Category_name:string;
    @ManyToOne(() => Addproperty,addproperty=>addproperty.feature)
    @JoinColumn()
    addproperty: Addproperty;
}
    


