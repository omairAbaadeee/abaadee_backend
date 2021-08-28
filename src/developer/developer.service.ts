import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeveloperRepository } from 'src/reposatory/developerrepo.reposatory';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperDto } from 'src/dto/developer.dto';
import { Developer } from 'src/entity/developer.entity';
import { MemberListLogo } from 'src/entity/developermemberlogo.entity';
import { MemberlistRepository } from 'src/reposatory/memberlist.reposatory';
import { Addimagedto } from 'src/dto/addproerty.dto';
import { url } from 'src/Global/Variable';
import { Blog } from 'src/entity/blog.entity';
import { BlogimageRepositery } from 'src/reposatory/blogimage.reposatory';
import { BlogRepositery } from 'src/reposatory/blog.reposatory';
import { BlogImage } from 'src/entity/blogimage.entity';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
const fs = require('fs');

@Injectable()
export class DeveloperService {
    constructor(
        @InjectRepository(DeveloperRepository)
        private developerrepo: DeveloperRepository,

        @InjectRepository(MemberlistRepository)
        private memberlist: MemberlistRepository,

      
        @InjectRepository(CityRepository)
        private cityReposatory: CityRepository,
        @InjectRepository(LocationRepository)
        private locationReposatory: LocationRepository,

       

        @InjectRepository(BlogRepositery)
        private blogReposatory: BlogRepositery,

        @InjectRepository(BlogimageRepositery)
        private blogimageReposatory: BlogimageRepositery,

    ) { }

    async AddDeveloper(developerdto: DeveloperDto, image, logo_image,memberlist) {
        const { name, address, email, mobileNo, officeNo, videoUrl, description, developRating, city, location} = developerdto;
        var parse1 = JSON.parse(developerdto.socialValues)
        const { fbProfile, instaProfile, twtProfile, inProfile, otherProfile, ytbProfile } = parse1;
        //console.log(fbProfile)
        const developer = new Developer();
        try {
            developer.name = name;

            image.forEach(async element => {
                developer.image = url + "/developer/image/" + element.filename
            });
            logo_image.forEach(async element => {
                developer.logo_image = url + "/developer/image/" + element.filename
            });
            developer.address = address;
            developer.email = email;
            developer.p_number = mobileNo;
            developer.office_number = officeNo;
            developer.vedio_link = videoUrl;
            developer.description = description;
            developer.rating = developRating;
            //developer.approved_by = approved_by;
            developer.facebook_link = fbProfile;
            developer.youtube_link = ytbProfile;
            developer.twitter_link = twtProfile;
            developer.linkdin_link = inProfile;
            developer.insta_ink = instaProfile;
            developer.other_link = otherProfile;
            
            const city1=await this.cityReposatory.createQueryBuilder("city").where("city.city_name=:city_name",{city_name:city}).getOne();
            developer.city=city1;
            const location1=await this.locationReposatory.createQueryBuilder("location").where("location.location_name=:location_name",{location_name:location}).getOne();
            developer.Location=location1;
            await this.developerrepo.save(developer);
            this.AddMember(memberlist, developer);
        } catch (error) {
            console.log(error)
        }
        //this.AddMember(memberList,developer);
    }
    async AddMember(memberList, developer: Developer) {
      memberList.forEach(element => {
          const member_list_logo=new MemberListLogo();
          member_list_logo.member_list_logo= url + "/developer/image/" + element.filename;
          member_list_logo.developer=developer;
          this.memberlist.save(member_list_logo);
      });
    }

    async getdevelopername(): Promise<Developer[]> {
        return await this.developerrepo.createQueryBuilder("developername").select(['developername.developer_id', 'developername.name']).getMany();
    }

    async getdeveloper(id): Promise<Developer> {

        return await this.developerrepo.createQueryBuilder("developer")
            .leftJoinAndSelect("developer.memberlist", "memberlist")
            .where("developer.developer_id=:developer_id", { developer_id: id })
            .getOne();
    }
    async getshortdeveloper(): Promise<Developer[]> {

        return await this.developerrepo.createQueryBuilder("developer")
            .select(["developer.name","developer.rating", "developer.address", "developer.image", "developer.logo_image", "developer.p_number", "developer.developer_id"])
            .getMany();
    }

    async deletedeveloper(id):Promise<any> {
        try{
        const developer_data = await this.developerrepo.createQueryBuilder("developer")
            .where("developer.developer_id=:developer_id", { developer_id: id })
            .getOne();
         const member_data= await this.memberlist.createQueryBuilder("member")
         .where("member.developer_id=:developer_id",{developer_id:id})   
        
         .getMany();
        
         console.log(member_data);
         member_data.forEach(async element=>{
             const data1= element.member_list_logo.replace(`${url}/developer/image/`, "");
             await this.deleteimage("./uploads/developer/" + data1);
         })
        const logo_image = developer_data.logo_image.replace(`${url}/developer/image/`, "");
        const image = developer_data.image.replace(`${url}/developer/image/`, "");
        await this.deleteimage("./uploads/developer/" + logo_image);
        await this.deleteimage("./uploads/developer/" + image);
        await this.memberlist
            .createQueryBuilder()
            .delete()
            .from(MemberListLogo)
            .where("developer_id = :developer_id", { developer_id: id })
            .execute();
        await this.developerrepo
            .createQueryBuilder()
            .delete()
            .from(Developer)
            .where("developer_id = :developer_id", { developer_id: id })
            .execute();
         return  HttpStatus.MOVED_PERMANENTLY;
        }
        catch(e){
            return HttpStatus.NOT_FOUND 
        }
    }

   
    deleteimage(path: string) {
        //const path = './uploads/delete/ahmed.png'

        try {
            fs.unlinkSync(path)
            //file removed
        } catch (err) {
            console.error(err)
        }
    }

    async addblog(body,blog_image){
        const blog=new Blog();
        blog.title=body.blog_title;
        blog.Date=body.blog_date;
        blog.short_description=body.blog_short_desc;
        blog.blog_type=body.blog_type;
        blog.full_description=body.blog_long_desc;
        await this.blogReposatory.save(blog);
        await this.addblogimaage(blog_image,blog);
    }
    addblogimaage(blog_image,blog:Blog){
      blog_image.forEach(element => {
          const blogimage=new BlogImage();
          blogimage.blog_image=url + "/developer/blog_image/" +element.filename;
          blogimage.blog=blog;
          this.blogimageReposatory.save(blogimage);
      });
    }
    async shortBlog(options: IPaginationOptions): Promise<Pagination<Blog>>{
        const data = await this.blogReposatory.createQueryBuilder("blog")
        .leftJoinAndSelect("blog.blogimage","blogimage")
        .select(["blog.blog_id","blog.short_description","blog.Date","blog.title","blogimage"])
        return paginate<Blog>(data, options);
    }
    async getalldata(id): Promise<Blog>{
        const data = await this.blogReposatory.createQueryBuilder("blog")
        .leftJoinAndSelect("blog.blogimage","blogimage")
        .where("blog.blog_id=:blog_id",{blog_id:id})
        .getOne()
        //.select(["blog.blog_id","blog.short_description","blog.Date","blogimage"])
        return data;
    }
    async deleteblog(Id):Promise<any> {
        try {

            const data = await this.blogimageReposatory.createQueryBuilder("bimage")
             .where("bimage.blog=:blog", { blog: Id })
            .getMany();
                console.log(data);
                data.forEach(element=>{
                    console.log(element.blog_image);
                    const logo_image = element.blog_image.replace(`${url}/developer/blog_image/`, "");
                    this.deleteimage("./uploads/blog/" + logo_image);
                })
               
            await this.blogimageReposatory
                .createQueryBuilder()
                .delete()
                .from(BlogImage)
                .where("blog = :blog", { blog: Id })
                .execute();
                await this.blogReposatory.createQueryBuilder()
                .delete()
                .from(Blog)
                .where("blog_id=:blog_id",{blog_id:Id})
                .execute();
                return HttpStatus.MOVED_PERMANENTLY;
        } catch {
            return HttpStatus.NOT_FOUND;
        }
    }
  

}
