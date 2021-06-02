import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { User } from "./user.entity";
@Entity()
export class PropertyContact{

    @PrimaryGeneratedColumn()
    id: number;
  
    
    @Column()
    name: string;
    
    @Column()
    p_number: string;
    
    @Column()
    email: string;
    
    @Column()
    message: string;
   @Column()
   date: Date;
   @ManyToOne(()=>Addproperty,addproerty=>addproerty.propertycontact)
   addproerty:Addproperty;
   
   @ManyToOne(()=>User,user=>user.propertycontact)
   user:User;
   


}

