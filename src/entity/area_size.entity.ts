import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AreaSize {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    area_size: number;
}