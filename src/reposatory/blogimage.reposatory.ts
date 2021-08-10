import { BlogImage } from "src/entity/blogimage.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BlogImage)
export class BlogimageRepositery extends Repository<BlogImage>{
    
}