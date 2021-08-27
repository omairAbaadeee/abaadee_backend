import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addimagedto } from 'src/dto/addproerty.dto';
import { Project } from 'src/entity/project.entity';
import { Projectimage } from 'src/entity/projectimage.entity';
import { Project_Aminities } from 'src/entity/project_aminities.entity';
import { url } from 'src/Global/Variable';
import { CityRepository } from 'src/reposatory/city.repositery';
import { DeveloperRepository } from 'src/reposatory/developerrepo.reposatory';
import { LocationRepository } from 'src/reposatory/location.repository';
import { Project_AminitiesRepository } from 'src/reposatory/projectaminities.reposatory';
import { ProjectimageRepository } from 'src/reposatory/projectimage.reposatory';
import { ProjectRepository } from 'src/reposatory/projectrepo.reposatry';
const fs = require('fs');

@Injectable()
export class ProjectService {
  constructor(
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

    @InjectRepository(DeveloperRepository)
    private developerrepo: DeveloperRepository,
    ){}
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
    project.phone_no=body.phone_no;
    project.payment_option = body.payment;
    logo_image.forEach(async element => {
        project.project_logo_image = url + "/project/project_image/" + element.filename
    })
    cover_image.forEach(async element => {
        project.project_cover_image = url + "/project/project_image/" + element.filename
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
    //console.log(finddeveloper)
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
        projectimage.imageurl = url + "/project/project_image/" + element.filename;
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
        .select(["project","location","city","developer.name","developer.developer_id","project_image","project_aminities"])
        .getOne();
}

async searchprojectbycity(city):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("city.city_name=:city_name",{city_name:city})
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async searchprojectbydevelopertitile(developer_title):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("developer.name=:name",{name:developer_title})
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async searchprojectbyprojecttitile(project_name):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("project.project_name=:project_name",{project_name:project_name})
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async searchprojectbycity_project_type(city,developer_title):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("city.city_name=:city_name",{city_name:city})
    .where("developer.name=:name",{name:developer_title})
    
    
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async searchprojectbycity_project_type_developertitle(city,project_name):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("city.city_name=:city_name",{city_name:city})
    .where("project.project_name=:project_name",{project_name:project_name})
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async searchprojectbycity_project_type_developertitle_projecttitle(developer_title,project_name):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("developer.name=:name",{name:developer_title})
    .where("project.project_name=:project_name",{project_name:project_name})
    
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async searchprojectbycitydeveloperproject(city,developer_title,project_name):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("city.city_name=:city_name",{city_name:city})
    
    .where("developer.name=:name",{name:developer_title})
    .where("project.project_name=:project_name",{project_name:project_name})
    
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async searchprojectbyAll(city,developer_title,project_name):Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .where("city.city_name=:city_name",{city_name:city})
    
    .orWhere("developer.name=:name",{name:developer_title})
    .orWhere("project.project_name=:project_name",{project_name:project_name})
    
    .select(["project.project_id", "project.project_name", "project.project_type", "project.price", "project.project_logo_image", "project.project_cover_image"
        , "project.completion_year", "location.location_name", "city.city_name"])
    .getMany();
    return data;
}
async getprojectname():Promise<Project[]>{
    const data= await this.projectrepo.createQueryBuilder("project")
    .leftJoinAndSelect("project.city", "city")
    .leftJoinAndSelect("project.location", "location")
    .leftJoinAndSelect("project.developer", "developer")
    .select("project.project_name")
    .getMany();
    return data;
}
    async deleteProject(id):Promise<any> {
        try{
        const pro_image=await this.projectimageRepository.createQueryBuilder("image")
        .where("image.project_id=:project_id",{project_id:id})
        .getMany();
        pro_image.forEach(async element=>{
            const image=element.imageurl.replace(`${url}/developer/project_image/`, "")
            await this.deleteimage("./uploads/project/" + image)
        })
        const project=await this.projectrepo.createQueryBuilder("project")
        .where("project.project_id=:project_id",{project_id:id})
        .getOne();
        const logo_image=project.project_logo_image.replace(`${url}/developer/project_image/`, "")
        const cover_image=project.project_cover_image.replace(`${url}/developer/project_image/`, "")
        await this.deleteimage("./uploads/project/" + logo_image)
        await this.deleteimage("./uploads/project/" + cover_image)
     await  await this.project_AminitiesRepository
    .createQueryBuilder()
    .delete()
    .from(Project_Aminities)
    .where("Project_id = :Project_id", { Project_id: id })
    .execute();
    await  await this.projectimageRepository
    .createQueryBuilder()
    .delete()
    .from(Projectimage)
    .where("Project_id = :Project_id", { Project_id: id })
    .execute();
    await  await this.projectrepo
    .createQueryBuilder()
    .delete()
    .from(Project)
    .where("Project_id = :Project_id", { Project_id: id })
    .execute();
    return HttpStatus.MOVED_PERMANENTLY;
        }catch{
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

}
