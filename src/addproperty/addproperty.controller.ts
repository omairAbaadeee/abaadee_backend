import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Addpropertydto } from 'src/dto/addproerty.dto';
import { AddpropertyService } from './addproperty.service';
import { editFileName, imageFileFilter } from './file.upload';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Propertyimage } from 'src/entity/propertyimage.entity';
import { Addproperty, Purpose } from 'src/entity/addproperty.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
import {AddpropertySearch} from "src/dto/addpropertysearch.dto";
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

    findpropertydata(@Body() addpropertysearch:AddpropertySearch): Promise<Addproperty[]> {
        const {purpose, city_name, location_name, property_type, min_price,max_price,min_area,max_area,beds,area_unit_name}=addpropertysearch;
    //     if (city_name && !location_name  && !area_unit_name && !beds && !PropertyTypeName && !property_type) {  

    //         return this.addproservice.find_data_From_cityname(city_name,purpose);
    //     }
    //      if (location_name && !city_name && !BathroomNumber && !area_unit_name && !beds && !PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_locationname(locationname,purpose);
    //     }
    //      if (BathroomNumber && !city_name && !location_name && !area_unit_name && !beds && !PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_Bathroom(BathroomNumber,purpose);

    //     }
    //      if (area_unit_name && !city_name && !location_name && !BathroomNumber && !beds && !PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_AreaUnit(AreaUnitname,purpose);
    //     }
    //      if (beds && !city_name && !location_name && !BathroomNumber && !area_unit_name && !PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_Bed(BedNumber,purpose);
    //     }
    //      if (PropertyTypeName && !city_name && !location_name && !BathroomNumber && !area_unit_name && !beds && !property_type) {
    //         return this.addproservice.find_data_From_PropertyType(PropertyTypeName,purpose);
    //     }
    //      if (property_type && !city_name && !location_name && !BathroomNumber && !area_unit_name && !beds && !PropertyTypeName) {
    //         return this.addproservice.find_data_From_PropertySubType(Property_Category,purpose);
    //     }
    //   /*  else {
            
    //         return  null;
    //     }
    // }
    // @Post("getpropertydata2")

    // findpropertydata2(@Body('cityname') cityname: string,
    //     @Body('locationname') locationname: string,
    //     @Body('BathroomNumber') BathroomNumber: number,
    //     @Body('AreaUnitname') AreaUnitname: string,
    //     @Body('BedNumber') BedNumber: number,
    //     @Body('PropertyTypeName') PropertyTypeName: string,
    //     @Body('Property_Category') Property_Category: string,
    // ): Promise<Addproperty[]>
    // { */

    //     if (city_name && location_name && !BathroomNumber && !area_unit_name && !beds && !PropertyTypeName && !property_type) {
    //        console.log("salman");
    //         return this.addproservice.find_data_From_Cityname_Locationname(cityname, locationname,purpose);
    //     }
    //    /* else {

    //         return null;
    //     }
    // }
    //     @Post("getpropertydata3")

    //     findpropertydata3(@Body('cityname') cityname: string,
    //     @Body('locationname') locationname: string,
    //     @Body('BathroomNumber') BathroomNumber: number,
    //     @Body('AreaUnitname') AreaUnitname: string,
    //     @Body('BedNumber') BedNumber: number,
    //     @Body('PropertyTypeName') PropertyTypeName: string,
    //     @Body('Property_Category') Property_Category: string,
    // ): Promise<Addproperty[]>
    //     {*/

    //     if (city_name && location_name && BathroomNumber && !area_unit_name && !beds && !PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber(cityname, locationname, BathroomNumber,purpose);
    //     }
    //      if (city_name && location_name && BathroomNumber && area_unit_name && !beds && !PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit(cityname, locationname, BathroomNumber, AreaUnitname,purpose);
    //     }
    //      if (city_name && location_name && BathroomNumber && area_unit_name && beds && !PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber(cityname, locationname, BathroomNumber, AreaUnitname, BedNumber,purpose);
    //     }
    //      if (city_name && location_name && BathroomNumber && area_unit_name && beds && PropertyTypeName && !property_type) {
    //         return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType(cityname, locationname, BathroomNumber, AreaUnitname, BedNumber, PropertyTypeName,purpose);
    //     }
         if (city_name && location_name && min_price && max_price && min_area &&max_area && area_unit_name && beds && property_type) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType_PropertySubType(addpropertysearch);
        }
        else {
            return null;
        }

    }
}
