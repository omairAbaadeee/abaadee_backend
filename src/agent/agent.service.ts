import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/entity/agent.entity';
import { url } from 'src/Global/Variable';
import { AgentReposatory } from 'src/reposatory/agent.reposatory';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
const fs = require('fs');

@Injectable()
export class AgentService {
 
    constructor(
        @InjectRepository(AgentReposatory)
        private agentReposatory: AgentReposatory,

        @InjectRepository(CityRepository)
        private cityReposatory: CityRepository,
        @InjectRepository(LocationRepository)
        private locationReposatory: LocationRepository,
    ){}
    async addagent(agent_image, logo_image, body) {

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
            const city=await this.cityReposatory.createQueryBuilder("city").where("city.city_name=:city_name",{city_name:body.city}).getOne();
            agent.city=city;
            const location=await this.locationReposatory.createQueryBuilder("location").where("location.location_name=:location_name",{location_name:body.location}).getOne();
            agent.location=location;
            var parse = JSON.parse(body.socialValues)
            agent.fb_link = parse.fbProfile;
            agent.insta_link = parse.instaProfile;
            agent.twitter_link = parse.twtProfile;
            agent.linkdin_link = parse.inProfile;
            agent.other_link = parse.otherProfile;
            agent.youtube_link = parse.ytbProfile;
            agent_image.forEach(async element => {
                agent.image = url + "/agent/agent_image/" + element.filename
            });
            logo_image.forEach(async element => {
                agent.logo_image = url + "/agent/agent_image/" + element.filename
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
        const data = await this.agentReposatory.createQueryBuilder("agent")
        .where("agent.id=:id", { id: id })
            .getOne();
            console.log(data)
        return data;
    }


    async getshortagent(): Promise<Agent[]> {
        const data = await this.agentReposatory.createQueryBuilder("agent")
        .select(["agent.name", "agent.address", "agent.image", "agent.logo_image", 
        "agent.number","agent.agent_rating", "agent.id"]).getMany();
        return data;
    }

    async delete_agent(Id):Promise<any> {
        try {

            const data = await this.agentReposatory.createQueryBuilder("agent")
            .leftJoinAndSelect("agent.city","city")
            .leftJoinAndSelect("agent.location","location")
             .where("agent.id=:id", { id: Id })
            .getOne();
                console.log(data);
               console.log(data.image);
            const logo_image = data.logo_image.replace(`${url}/agent/agent_image/`, "");
            const image = data.image.replace(`${url}/agent/agent_image/`, "");
            this.deleteimage("./uploads/agent/" + logo_image);
            this.deleteimage("./uploads/agent/" + image);
            await this.agentReposatory
                .createQueryBuilder()
                .delete()
                .from(Agent)
                .where("id = :id", { id: Id })
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
    serchby_city(name):Promise<Agent[]>{
        const data= this.agentReposatory.createQueryBuilder("agent")
        .where("agent.name=:name",{name:name}).getMany();
        return data;
    }
}
