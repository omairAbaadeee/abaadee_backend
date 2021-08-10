import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class General_Information {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable:true})
    year:string;

   
    @Column({nullable:true})
    bathrooms:string;
    @Column({nullable:true})
    bedrooms:string;
    @Column({nullable:true})
    parking:string;
    @Column({nullable:true})
    floors:string;
    @Column({nullable:true})
    flooring:string;
    @Column({nullable:true})
    backup:string;
      
    @ManyToOne(() => Addproperty,addproperty=>addproperty.general_info)
    @JoinColumn()
    addproperty: Addproperty;
}
    


