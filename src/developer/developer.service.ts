import { Injectable } from '@nestjs/common';
import { DeveloperRepository } from 'src/reposatory/developerrepo.reposatory';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperDto } from 'src/dto/developer.dto';
import { Developer } from 'src/entity/developer.entity';
import { MemberList } from 'src/entity/memberlist.entity';
import { MemberlistRepository } from 'src/reposatory/memberlist.reposatory';
import { Addimagedto } from 'src/dto/addproerty.dto';
import { url } from 'src/Global/Variable';

@Injectable()
export class DeveloperService {
constructor(
    @InjectRepository(DeveloperRepository)
    private developerrepo: DeveloperRepository,

    @InjectRepository(MemberlistRepository)
    private memberlist: MemberlistRepository,
){}

async AddDeveloper(developerdto:DeveloperDto,response:Addimagedto){
const{name,address,email,mobileNo,officeNo,videoUrl,description,developRating,socialValues,memberList}=developerdto;
var parse1 = JSON.parse(developerdto.socialValues)
const{fbProfile,instaProfile,twtProfile,inProfile,otherProfile,ytbProfile}=parse1;
//console.log(fbProfile)
const developer=new Developer();
try{
developer.name=name;
developer.image=url+"/developer/image/"+response.filename;
developer.address=address;
developer.email=email;
developer.p_number=mobileNo;
developer.office_number=officeNo;
developer.vedio_link=videoUrl;
developer.description=description;
developer.rating=developRating;
developer.facebook_link=fbProfile;
developer.youtube_link=ytbProfile;
developer.twitter_link=twtProfile;
developer.linkdin_link=inProfile;
developer.insta_ink=instaProfile;
developer.other_link=otherProfile;
await this.developerrepo.save(developer);
 this.AddMember(memberList,developer);
}catch(error){
    console.log(error)
}
//this.AddMember(memberList,developer);
}
 async AddMember(memberList,developer:Developer){
    var parse1 = JSON.parse(memberList)
     console.log(parse1)

for (var x of Object.entries(parse1)) {
    //console.log(x[0])
    if (x[1] == true) {
        console.log(x[0])
    const memberlist1=new MemberList();
      memberlist1.member_list_name=x[0];
      memberlist1.developer=developer;
     await this.memberlist.save(memberlist1);
    }
}
}

    async getdevelopername():Promise<Developer[]>{
    return await this.developerrepo.createQueryBuilder("developername").select("developername.name").getMany();
    
}

}
