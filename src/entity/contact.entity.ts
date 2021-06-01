import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Contact{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    f_name: string;
    
    @Column()
    l_name: string;
    
    @Column()
    p_number: string;
    
    @Column()
    email: string;
    
    @Column()
    message: string;
   @Column()
   date: Date;

}
