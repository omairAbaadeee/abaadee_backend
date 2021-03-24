import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Addpropertydto } from 'src/dto/addproerty.dto';
import { AddpropertyService } from './addproperty.service';
import { editFileName, imageFileFilter } from './file.upload';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Propertyimage } from 'src/entity/propertyimage.entity';
import { Addproperty } from 'src/entity/addproperty.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
@Controller('addproperty')
export class AddpropertyController {
    constructor(
        private addproservice: AddpropertyService
    ) { }
    // @Post("/:username")
    // CreateProperty(@Body() addpropertydto: Addpropertydto, @Param("username") username: string) {
    //     //console.log(addpropertydto,username);
    //     this.addproservice.addproperty(addpropertydto, username);
    // }
    @Get()
    Addproperty() {
        return "Hello";
    }

    @Post("/upload")
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/images',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
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


    @Post('uploadMultipleFiles')
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FilesInterceptor('image', 11, {
            storage: diskStorage({
                destination: './uploads/images',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files,@Body() addpropertydto: Addpropertydto,
    @GetUser() user:User) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                //originalname: file.originalname,
                filename: file.filename,

            };
            response.push(fileReponse);
        });



        //save first Addproperty in database then images save
        console.log(addpropertydto);
        this.addproservice.addproperty(addpropertydto,user,response);

        // console.log(files);
        // this.addproservice.addimage(response);

      
        
        
        return {
            status: HttpStatus.OK,
            message: 'Images uploaded successfully!',
            data: response,

        };
    }




    @Get("image/:imagename")
    findimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
    }

    @Get("getalldata")
    findalldata():Promise<Addproperty[]>{
        return this.addproservice.getalldata();
    }
    @Post("getonedata")
    findonedata(@Body("lname") lname:string,@Body("propertycatogory") propertycatogory:string):Promise<Addproperty[]>{
        if(!propertycatogory){
            return this.addproservice.find_data_From_Cityname(lname);
        }
       
        
        return this.addproservice.find_data_From_Locationname_Propertycatogory(lname,propertycatogory);
       
    }
}
