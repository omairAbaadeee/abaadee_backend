import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class General_Information {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    year:Date;

   
    @Column()
    bathroom:number;
      
    @Column()
    badroom:number;
    @Column()
    parking_area:number;
    @Column()
    floor:number;
    @Column()
    flooring:string;
    @Column()
    electricity:string;
      
    @ManyToOne(() => Addproperty,addproperty=>addproperty.general_info)
    @JoinColumn()
    addproperty: Addproperty;
}
    


