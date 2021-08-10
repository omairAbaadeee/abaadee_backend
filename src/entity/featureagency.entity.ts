import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FeatureAgency {

    @PrimaryGeneratedColumn()
    f_id: number;

    @Column()
    f_link: string;

    @Column()
    f_image: string;
}