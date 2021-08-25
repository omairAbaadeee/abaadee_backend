import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Partner {

    @PrimaryGeneratedColumn()
    p_id: number;

    @Column()
    p_image: string;

    @Column()
    p_link: string;
    

}