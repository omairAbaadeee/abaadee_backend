import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Advertisement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    advertisement_img: string;
    
    @Column()
    company_name:string;

    @Column()
    company_link:string;

    @Column()
    page_name:string;

    @Column()
    date:Date;
}