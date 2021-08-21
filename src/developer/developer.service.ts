import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeveloperRepository } from 'src/reposatory/developerrepo.reposatory';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperDto } from 'src/dto/developer.dto';
import { Developer } from 'src/entity/developer.entity';
import { MemberList } from 'src/entity/memberlist.entity';
import { MemberlistRepository } from 'src/reposatory/memberlist.reposatory';
import { Addimagedto } from 'src/dto/addproerty.dto';
import { url } from 'src/Global/Variable';
import { Blog } from 'src/entity/blog.entity';
import { BlogimageRepositery } from 'src/reposatory/blogimage.reposatory';
import { BlogRepositery } from 'src/reposatory/blog.reposatory';
import { BlogImage } from 'src/entity/blogimage.entity';
const fs = require('fs');

@Injectable()
export class DeveloperService {
    constructor(
        @InjectRepository(DeveloperRepository)
        private developerrepo: DeveloperRepository,

        @InjectRepository(MemberlistRepository)
        private memberlist: MemberlistRepository,

      

       

        @InjectRepository(BlogRepositery)
        private blogReposatory: BlogRepositery,

        @InjectRepository(BlogimageRepositery)
        private blogimageReposatory: BlogimageRepositery,

    ) { }

    async AddDeveloper(developerdto: DeveloperDto, image, logo_image) {
        const { name, address, email, mobileNo, officeNo, videoUrl, description, developRating, socialValues, memberList } = developerdto;
        var parse1 = JSON.parse(developerdto.socialValues)
        const { fbProfile, instaProfile, twtProfile, inProfile, otherProfile, ytbProfile } = parse1;
        //console.log(fbProfile)
        const developer = new Developer();
        try {
            developer.name = name;

            logo_image.forEach(async element => {
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
            await this.developerrepo.save(developer);
            this.AddMember(memberList, developer);
        } catch (error) {
            console.log(error)
        }
        //this.AddMember(memberList,developer);
    }
    async AddMember(memberList, developer: Developer) {
        var parse1 = JSON.parse(memberList)
        console.log(parse1)

        for (var x of Object.entries(parse1)) {
            //console.log(x[0])
            if (x[1] == true) {
                console.log(x[0])
                const memberlist1 = new MemberList();
                memberlist1.member_list_name = x[0];
                memberlist1.developer = developer;
                await this.memberlist.save(memberlist1);
            }
        }
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
    async deletedeveloper(id) {
        const data = await this.developerrepo.createQueryBuilder("developer")
            .where("developer.developer_id=:developer_id", { developer_id: id })
            .getOne();
        //const logo_image = data.logo_image.replace(`${url}/developer/image/`, "");
        const image = data.image.replace(`${url}/developer/image/`, "");
        //await this.deleteimage("./uploads/developer/" + logo_image);
       // await this.deleteimage("./uploads/developer/" + image);
        await this.memberlist
            .createQueryBuilder()
            .delete()
            .from(MemberList)
            .where("id = :id", { id: id })
            .execute();
        await this.developerrepo
            .createQueryBuilder()
            .delete()
            .from(Developer)
            .where("developer_id = :developer_id", { developer_id: id })
            .execute();
       

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
}
