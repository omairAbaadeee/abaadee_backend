import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { editFileName, imageFileFilter } from 'src/addproperty/file.upload';
import { DeveloperDto } from 'src/dto/developer.dto';
import { PropertyContactdto } from 'src/dto/propertycontact.dto';
import { Developer } from 'src/entity/developer.entity';
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
          destination: './uploads/developer',
          filename: editFileName,
        }),
      fileFilter: imageFileFilter,
      },
    ),)
    uploadFile(@UploadedFiles() files,@Body() body) {
        console.log(files);
        console.log(body);
    }
    
@Get("getdevelopername")
getdevelopername():Promise<Developer[]>{
    return this.developerservice.getdevelopername();
}

}

