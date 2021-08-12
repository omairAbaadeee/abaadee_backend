import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeveloperRepository } from 'src/reposatory/developerrepo.reposatory';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperDto } from 'src/dto/developer.dto';
import { Developer } from 'src/entity/developer.entity';
import { MemberList } from 'src/entity/memberlist.entity';
import { MemberlistRepository } from 'src/reposatory/memberlist.reposatory';
import { Addimagedto } from 'src/dto/addproerty.dto';
import { url } from 'src/Global/Variable';
import { Project } from 'src/entity/project.entity';
import { LocationRepository } from 'src/reposatory/location.repository';
import { CityRepository } from 'src/reposatory/city.repositery';
import { ProjectRepository } from 'src/reposatory/projectrepo.reposatry';
import { Projectimage } from 'src/entity/projectimage.entity';
import { ProjectimageRepository } from 'src/reposatory/projectimage.reposatory';
import { Project_AminitiesRepository } from 'src/reposatory/projectaminities.reposatory';
import { Project_Aminities } from 'src/entity/project_aminities.entity';
import { AgentReposatory } from 'src/reposatory/agent.reposatory';
import { Agent } from 'src/entity/agent.entity';
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

        @InjectRepository(CityRepository)
        private cityrepo: CityRepository,

        @InjectRepository(LocationRepository)
        private locationrepo: LocationRepository,

        @InjectRepository(ProjectRepository)
        private projectrepo: ProjectRepository,

        @InjectRepository(ProjectimageRepository)
        private projectimageRepository: ProjectimageRepository,

        @InjectRepository(Project_AminitiesRepository)
        private project_AminitiesRepository: Project_AminitiesRepository,

        @InjectRepository(AgentReposatory)
        private agentReposatory: AgentReposatory,

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
            .select(["developer.name", "developer.address", "developer.image", "developer.logo_image", "developer.p_number", "developer.developer_id"])
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

    async addproject(body, fp_images, pp_images, pi_images, logo_image, cover_image) {
        const project = new Project();
        project.project_name = body.name;
        project.total_area = body.area;
        project.price = body.price;
        project.completion_year = body.completion_year;
        project.project_type = body.project_type;
        project.description = body.description;
        project.approved_by = body.approved_by;
        project.latitude = body.lat;
        project.longitude = body.lng;
        project.payment_option = body.payment;
        logo_image.forEach(async element => {
            project.project_logo_image = url + "/developer/project_image/" + element.filename
        })
        cover_image.forEach(async element => {
            project.project_cover_image = url + "/developer/project_image/" + element.filename
        })
        const findcity = await this.cityrepo
            .createQueryBuilder("city")
            .where("city.city_name = :city_name", { city_name: body.city })
            .getOne();
        project.city = findcity;
        const findlocation = await this.locationrepo
            .createQueryBuilder("location")
            .where("location.location_name = :location_name", { location_name: body.location })
            .getOne();
        project.location = findlocation;
        const finddeveloper = await this.developerrepo.createQueryBuilder("developer")
            .where("developer.developer_id=:developer_id", { developer_id: parseInt(body.developer) })
            .getOne();
        console.log(finddeveloper)
        project.developer = finddeveloper;
        await this.projectrepo.save(project);
        await this.addimage(fp_images, project, "fp_images");
        await this.addimage(pp_images, project, "pp_images");
        await this.addimage(pi_images, project, "pi_images");
        var parse = JSON.parse(body.amenities)
        await this.addaminities(parse.Home_business_And_Communication, "Home_business_And_Communication", project);
        await this.addaminities(parse.Home_Facing, "Home_Facing", project);
        await this.addaminities(parse.Home_utilities, "Home_utilities", project);
        await this.addaminities(parse.NearbyLocations, "NearbyLocations", project);
        await this.addaminities(parse.CommunityFeatures, "CommunityFeatures", project);
        await this.addaminities(parse.Features, "Features", project);


    }

    async addimage(images: Addimagedto[], projectid: Project, image_type: string) {


        images.forEach(async element => {
            const projectimage = new Projectimage();
            projectimage.imageurl = url + "/developer/project_image/" + element.filename;
            projectimage.project = projectid;
            projectimage.image_type = image_type;
            await this.projectimageRepository.save(projectimage);
        })

    }
    async addaminities(body, aminity_name: string, projectid: Project) {
        for (var x of Object.entries(body)) {
            if (x[1] == true) {
                console.log(x[0]);
                const project_Aminities = new Project_Aminities();
                project_Aminities.Category_name = aminity_name;
                project_Aminities.feature_name = x[0];
                project_Aminities.project = projectid;
                await this.project_AminitiesRepository.save(project_Aminities);

            }
        }

    }
    async getshortproject(): Promise<Project[]> {

        return await this.projectrepo.createQueryBuilder("project")
            .leftJoinAndSelect("project.city", "city")
            .leftJoinAndSelect("project.location", "location")
            .leftJoinAndSelect("project.developer", "developer")
            .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
                , "project.completion_year", "location.location_name", "city.city_name"])
            .getMany();
    }

    async getproject(id): Promise<Project> {

        return await this.projectrepo.createQueryBuilder("project")
            .leftJoinAndSelect("project.city", "city")
            .leftJoinAndSelect("project.location", "location")
            .leftJoinAndSelect("project.developer", "developer")
            .leftJoinAndSelect("project.project_image", "project_image")
            .leftJoinAndSelect("project.project_aminities", "project_aminities")
            .where("project.project_id=:project_id", { project_id: id })
            .getOne();
    }



    addagent(agent_image, logo_image, body) {

        try {
            const agent = new Agent()
            agent.name = body.name;
            agent.address = body.address;
            agent.number = body.mobileNo;
            agent.office_no = body.officeNo;
            agent.email = body.email;
            agent.description = body.description;
            agent.agent_rating = body.developRating;
            agent.video_link = body.videoUrl;
            var parse = JSON.parse(body.socialValues)
            agent.fb_link = parse.fbProfile;
            agent.insta_link = parse.instaProfile;
            agent.twitter_link = parse.twtProfile;
            agent.linkdin_link = parse.inProfile;
            agent.other_link = parse.otherProfile;
            agent.youtube_link = parse.ytbProfile;
            agent_image.forEach(async element => {
                agent.image = url + "/developer/agent_image/" + element.filename
            });
            logo_image.forEach(async element => {
                agent.logo_image = url + "/developer/agent_image/" + element.filename
            });

            this.agentReposatory.save(agent);

            return new HttpException(
                'agent added successfully',
                HttpStatus.CREATED,
            )


        }
        catch (e) {
            return e;
        }





    }
    async getagent(id): Promise<Agent> {
        const data = await this.agentReposatory.createQueryBuilder("agent").where("agent.id=:id", { id: id })
            .getOne();
        return data;
    }


    async getshortagent(): Promise<Agent[]> {
        const data = await this.agentReposatory.createQueryBuilder("agent").select(["agent.name", "agent.address", "agent.image", "agent.logo_image", "agent.number", "agent.id"]).getMany();
        return data;
    }

    async delete_agent(id):Promise<any> {
        try {

            const data = await this.agentReposatory.createQueryBuilder("agent").where("agent.id=:id", { id: id })
                .getOne();
            const logo_image = data.logo_image.replace(`${url}/developer/agent_image/`, "");
            const image = data.image.replace(`${url}/developer/agent_image/`, "");
            this.deleteimage("./uploads/agent/" + logo_image);
            this.deleteimage("./uploads/agent/" + image);
            await this.agentReposatory
                .createQueryBuilder()
                .delete()
                .from(Agent)
                .where("id = :id", { id: id })
                .execute();
                return HttpStatus.MOVED_PERMANENTLY;
        } catch {
            return HttpStatus.NOT_FOUND;
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
}
