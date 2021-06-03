import { Body, Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/addproperty/file.upload';
import { PropertyContactdto } from 'src/dto/propertycontact.dto';
import { DeveloperService } from './developer.service';

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
    async uploadedFile(@UploadedFile() file,@Body() body) {
      const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
     
    
        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
            data: response,
        };
    } 
 
}

