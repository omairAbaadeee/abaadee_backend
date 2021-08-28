import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";

@Entity()
export class BlogImage {

    @PrimaryGeneratedColumn()
    blog_image_id: number;

    @Column()
    blog_image: string;

    @ManyToOne(()=>Blog,blog=>blog.blogimage,{onDelete:"CASCADE"})
    blog:Blog;
}