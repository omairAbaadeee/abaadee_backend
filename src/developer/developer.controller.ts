import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { editFileName, imageFileFilter } from 'src/addproperty/file.upload';
import { DeveloperDto } from 'src/dto/developer.dto';
import { PropertyContactdto } from 'src/dto/propertycontact.dto';
import { Agent } from 'src/entity/agent.entity';
import { Developer } from 'src/entity/developer.entity';
import { Project } from 'src/entity/project.entity';
import { Watermark } from 'src/Watermark/watermark';
import { DeveloperService } from './developer.service';
var Jimp = require("jimp");
@Controller('developer')
export class DeveloperController {
    constructor(
        private developerservice: DeveloperService
    ) { }

    @Post("/develop")
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/developer',
                filename: editFileName,

            }),
            fileFilter: imageFileFilter,
        }),

    )
    async uploadedFile(@UploadedFile() file, @Body() body: DeveloperDto) {
        console.log(body)
        const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
        Watermark('./uploads/logo/logo.png', response.imagePath)

        this.developerservice.AddDeveloper(body, response);
        // return {
        //     status: HttpStatus.OK,
        //     message: 'Image uploaded successfully!',
        //     data: response,
        // };
    }
    @Get("image/:imagename")
    findimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/developer/' + imagename)));
    }
    @Get("developer/:id")
    getdeveloper(@Param("id") id):Promise<Developer>{
        return this.developerservice.getdeveloper(id);
    }
   @Get("shortdeveloper")
   getshortdeveloper():Promise<Developer[]>{
   return this.developerservice.getshortdeveloper();

   }

    // Start Project
    @Post('/project')
    @UseInterceptors(FileFieldsInterceptor( 
        [
        {name: 'fp_images', maxCount: 50,},
        {name: 'pp_images', maxCount: 50,},
        {name: 'pi_images', maxCount: 50,},
        {name: 'logo_image', maxCount: 1,},
        ],
        {
        storage: diskStorage({
          destination: './uploads/project',
          filename: editFileName,
        }),
      fileFilter: imageFileFilter,
      },
    ),)
    uploadFile(@UploadedFiles() files,@Body() body) {
        //console.log(files);
        //console.log(body);
        try{
        const fp_images = [];
        files.fp_images.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            fp_images.push(fileReponse);
        });
        console.log(fp_images);

        const pp_images = [];
        files.pp_images.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            pp_images.push(fileReponse);
        });
        console.log(pp_images);

        const pi_images = [];
        files.pi_images.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            pi_images.push(fileReponse);
        });
        console.log(pi_images);

        const logo_image = [];
        files.logo_image.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            logo_image.push(fileReponse);
        });
        console.log(logo_image)

        this.developerservice.addproject(body,fp_images,pp_images,pi_images,logo_image);
    }catch(e){console.log(e)}
 
    }
    
@Get("getdevelopername")
getdevelopername():Promise<Developer[]>{
    return this.developerservice.getdevelopername();
}

@Get("project/:id")
getproject(@Param("id") id):Promise<Project>{

    return this.developerservice.getproject(id);
}
@Get("shortproject")
getshortproject():Promise<Project[]>{
    return this.developerservice.getshortproject();
}

@Get("project_image/:imagename")
projectimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/project/' + imagename)));
}
//end project


//start agent
@Post("agent")
@UseInterceptors(
    FileInterceptor('agent_image', {
        storage: diskStorage({
            destination: './uploads/agent',
            filename: editFileName,

        }),
        fileFilter: imageFileFilter,
    }),

)
async addagent(@UploadedFile() file, @Body() body) {
    console.log(body)
    const response = {
        originalname: file.originalname,
        filename: file.filename,
        imagePath: file.path
    };
    this.developerservice.addagent(response,body)


  
}
@Get("agent/:id")
getagent(@Param("id") id):Promise<Agent>{
    return this.developerservice.getagent(id);
}

@Get("shortagent")
getshortagent():Promise<Agent[]>{
return this.developerservice.getshortagent();

}
@Get("agent_image/:imagename")
agentimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/agent/' + imagename)));
}// end agent

}

