import { Controller, Get, Post, Body, Put, Param, Delete, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { editFileName, imageFileFilter } from 'src/addproperty/file.upload';
import { Agent } from 'src/entity/agent.entity';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}
//start agent
@Post("agent")
@UseInterceptors(FileFieldsInterceptor( 
    [
    {name: 'agent_image', maxCount: 1,},
    {name: 'logo_image', maxCount: 1,},
    ],
    {
    storage: diskStorage({
      destination: './uploads/agent',
      filename: editFileName,
    }),
  fileFilter: imageFileFilter,
  },
),)
async addagent(@UploadedFiles() file, @Body() body) {
     console.log(body)
    const agent_image = [];
    file.agent_image.forEach(file => {
        const fileReponse = {
            filename: file.filename,
        };
        agent_image.push(fileReponse);
    });
    console.log(agent_image)
    const logo_image = [];
    file.logo_image.forEach(file => {
        const fileReponse = {
            filename: file.filename,
        };
        logo_image.push(fileReponse);
    });
    console.log(logo_image)
    this.agentService.addagent(agent_image,logo_image,body)


  
}
@Get("agent/:id")
getagent(@Param("id") id):Promise<Agent>{
    return this.agentService.getagent(id);
}

@Get("shortagent")
getshortagent():Promise<Agent[]>{
return this.agentService.getshortagent();

}
@Get("agent_image/:imagename")
agentimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/agent/' + imagename)));
}
@Post("delete_agent")
delete_agent(@Body() body):Promise<any>{
    console.log(body.id)
   return this.agentService.delete_agent(body.id);

}
@Post("serch_agent")
serchagent(@Body() body):Promise<Agent[]>{
 return this.agentService.serchby_city(body.name)
;}
@Get("agentname")
getagentname():Promise<Agent[]>{
return this.agentService.getagentname();
}

// end agent
 
}
