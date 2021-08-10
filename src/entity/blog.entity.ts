import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogImage } from "./blogimage.entity";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    blog_id: number;

    @Column()
    title: string;

    @Column()
    short_description: string;
    @Column()
    blog_type: string;
    @Column()
    full_description: string;
    @Column()
    Date: Date;

    @OneToMany(() => BlogImage, blogimage => blogimage.blog)
    blogimage: BlogImage[];
}