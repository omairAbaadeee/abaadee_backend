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
        return of(res.sendFile(join(process.cwd(), 'uploads/images/' + imagename)));
    }

    @Get("getalldata")
    findalldata():Promise<Addproperty[]>{
        return this.addproservice.getalldata();
    }
    @Get('getpropertydata/:purpose')
    getdatabypurpose(@Param('purpose') purpose: string): Promise<Addproperty[]> {
        return this.addproservice.getalldataByPurpose(purpose);

    }

    @Post("getpropertydata")

    findpropertydata(@Body('cityname') cityname: string,
        @Body('locationname') locationname: string,
        @Body('BathroomNumber') BathroomNumber: number,
        @Body('AreaUnitname') AreaUnitname: string,
        @Body('BedNumber') BedNumber: number,
        @Body('PropertyTypeName') PropertyTypeName: string,
        @Body('Property_Category') Property_Category: string,
    ): Promise<Addproperty[]> {
        if (cityname && !locationname && !BathroomNumber && !AreaUnitname && !BedNumber && !PropertyTypeName && !Property_Category) {  

            return this.addproservice.find_data_From_cityname(cityname);
        }
         if (locationname && !cityname && !BathroomNumber && !AreaUnitname && !BedNumber && !PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_locationname(locationname);
        }
         if (BathroomNumber && !cityname && !locationname && !AreaUnitname && !BedNumber && !PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_Bathroom(BathroomNumber);

        }
         if (AreaUnitname && !cityname && !locationname && !BathroomNumber && !BedNumber && !PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_AreaUnit(AreaUnitname);
        }
         if (BedNumber && !cityname && !locationname && !BathroomNumber && !AreaUnitname && !PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_Bed(BedNumber);
        }
         if (PropertyTypeName && !cityname && !locationname && !BathroomNumber && !AreaUnitname && !BedNumber && !Property_Category) {
            return this.addproservice.find_data_From_PropertyType(PropertyTypeName);
        }
         if (Property_Category && !cityname && !locationname && !BathroomNumber && !AreaUnitname && !BedNumber && !PropertyTypeName) {
            return this.addproservice.find_data_From_PropertySubType(Property_Category);
        }
      /*  else {
            
            return  null;
        }
    }
    @Post("getpropertydata2")

    findpropertydata2(@Body('cityname') cityname: string,
        @Body('locationname') locationname: string,
        @Body('BathroomNumber') BathroomNumber: number,
        @Body('AreaUnitname') AreaUnitname: string,
        @Body('BedNumber') BedNumber: number,
        @Body('PropertyTypeName') PropertyTypeName: string,
        @Body('Property_Category') Property_Category: string,
    ): Promise<Addproperty[]>
    { */

        if (cityname && locationname && !BathroomNumber && !AreaUnitname && !BedNumber && !PropertyTypeName && !Property_Category) {
           console.log("salman");
            return this.addproservice.find_data_From_Cityname_Locationname(cityname, locationname);
        }
       /* else {

            return null;
        }
    }
        @Post("getpropertydata3")

        findpropertydata3(@Body('cityname') cityname: string,
        @Body('locationname') locationname: string,
        @Body('BathroomNumber') BathroomNumber: number,
        @Body('AreaUnitname') AreaUnitname: string,
        @Body('BedNumber') BedNumber: number,
        @Body('PropertyTypeName') PropertyTypeName: string,
        @Body('Property_Category') Property_Category: string,
    ): Promise<Addproperty[]>
        {*/

        if (cityname && locationname && BathroomNumber && !AreaUnitname && !BedNumber && !PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber(cityname, locationname, BathroomNumber);
        }
         if (cityname && locationname && BathroomNumber && AreaUnitname && !BedNumber && !PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit(cityname, locationname, BathroomNumber, AreaUnitname);
        }
         if (cityname && locationname && BathroomNumber && AreaUnitname && BedNumber && !PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber(cityname, locationname, BathroomNumber, AreaUnitname, BedNumber);
        }
         if (cityname && locationname && BathroomNumber && AreaUnitname && BedNumber && PropertyTypeName && !Property_Category) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType(cityname, locationname, BathroomNumber, AreaUnitname, BedNumber, PropertyTypeName);
        }
         if (cityname && locationname && BathroomNumber && AreaUnitname && BedNumber && PropertyTypeName && Property_Category) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType_PropertySubType(cityname, locationname, BathroomNumber, AreaUnitname, BedNumber, PropertyTypeName, Property_Category);
        }
        else {
            return null;
        }

    }
}
