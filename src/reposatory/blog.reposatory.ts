import { Blog } from "src/entity/blog.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Blog)
export class BlogRepositery extends Repository<Blog>{
    
}