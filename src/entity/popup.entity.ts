import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Homepopup {

    @PrimaryGeneratedColumn()
    homepopup_id: number;

    @Column()
    homepopup_image: string;

    @Column()
    homepopup_link: string;
    

}