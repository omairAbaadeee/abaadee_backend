import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(FileFieldsInterceptor( 
        [
        {name: 'image', maxCount: 1,},
        {name: 'logo_image', maxCount: 1,},
        ],
        {
        storage: diskStorage({
          destination: './uploads/developer',
          filename: editFileName,
        }),
      fileFilter: imageFileFilter,
      },
    ),)
    async uploadedFile(@UploadedFiles() file, @Body() body: DeveloperDto) {
        console.log(body)
        const image = [];
        file.image.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            image.push(fileReponse);
        });
        console.log(image)
        const logo_image = [];
        file.logo_image.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            logo_image.push(fileReponse);
        });
        console.log(logo_image)
        //Watermark('./uploads/logo/logo.png', response.imagePath)

        this.developerservice.AddDeveloper(body, image,logo_image);
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
   @Get("delete_developer")
   deletedeveloper(){
       this.developerservice.deletedeveloper(1);
   }
   @Get("getdevelopername")
   getdevelopername():Promise<Developer[]>{
       return this.developerservice.getdevelopername();
   }





//start blogs
@Post("blog")
@UseInterceptors(
    FilesInterceptor(
        'blog_image', 11, {
        storage: diskStorage({
            destination: './uploads/blog',
            filename: editFileName,
            
        }
        ),
        fileFilter: imageFileFilter,
    }
    ),
)
async addblog(@UploadedFiles() file, @Body() body) {
    console.log(file);
    console.log(body);
    const blog_image = [];
    file.forEach(file => {
        const fileReponse = {
            filename: file.filename,
        };
        blog_image.push(fileReponse);
    });
    console.log(blog_image)
    this.developerservice.addblog(body,blog_image)
}


}

