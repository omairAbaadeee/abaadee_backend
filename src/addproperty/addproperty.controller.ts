import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Addpropertydto } from 'src/dto/addproerty.dto';
import { AddpropertyService } from './addproperty.service';
import { editFileName, imageFileFilter } from './file.upload';
import { diskStorage } from 'multer';
import { join, parse } from 'path';
import { Observable, of, throwError } from 'rxjs';
import { Addproperty, Purpose } from 'src/entity/addproperty.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { AddpropertySearch } from "src/dto/addpropertysearch.dto";
import { json } from 'express';
@Controller('addproperty')
export class AddpropertyController {
    constructor(
        private addproservice: AddpropertyService
    ) { }
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


    @Post('uploaddata')
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FilesInterceptor(
            'image', 11, {
            storage: diskStorage({
                destination: './uploads/images',
                filename: editFileName,
            }
            ),
            fileFilter: imageFileFilter,
        }
        ),
    )
    async uploadMultipleFiles(@UploadedFiles() files, @Body() addpropertydto: Addpropertydto,
        @GetUser() user: User) {
            console.log(addpropertydto);
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        try{
        this.addproservice.addproperty(addpropertydto,user,response);
        return {
            status: HttpStatus.OK,
            message: 'Property uploaded successfully!',
        };
        }catch{
            return throwError("Error");
        }
    }

    @Get("image/:imagename")
    findimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/images/' + imagename)));
    }

    // @Get("getalldata")
    // findalldata(): Promise<Addproperty[]> {
    //     return this.addproservice.getalldata();
    // }
    @Get('getpropertydata/:purpose')
    getdatabypurpose(@Param('purpose') purpose: string): Promise<Addproperty[]> {
        return this.addproservice.getalldataByPurpose(purpose);

    }
    @Post('upload1')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image1', maxCount: 5 },
        { name: 'image2', maxCount: 1 },
    ]))
    uploadFile(@UploadedFiles() files) {
        console.log(files);
    }
    @Get("databyid/:id")
    Getalldatabyid(@Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,@Param("id") id:number):Promise<Addproperty[]>{
        return this.addproservice.getalldata(
          id);

    }

    @Post("getpropertydata")

    findpropertydata(@Body() addpropertysearch: AddpropertySearch): Promise<Addproperty[]> {
        const { purpose, city_name, location_name, property_catogory, min_price, max_price, min_area, max_area, beds, area_unit_name } = addpropertysearch;
       // console.log(addpropertysearch);
        if (!city_name && purpose && !location_name && !area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_Purpose(addpropertysearch.purpose);
        }
        if (city_name && purpose && !location_name && !area_unit_name && !beds && !property_catogory) {

            return this.addproservice.find_data_From_cityname(addpropertysearch);
        }
        if (location_name && purpose && !city_name && !area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_locationname(addpropertysearch);
        }

        if (area_unit_name && purpose && !city_name && !location_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_AreaUnit(addpropertysearch);
        }
        if (beds && purpose && !city_name && !location_name && !area_unit_name && !property_catogory) {
            return this.addproservice.find_data_From_Bed(addpropertysearch);
        }

        if (property_catogory && purpose && !city_name && !location_name && !area_unit_name && !beds) {
            return this.addproservice.find_data_From_PropertySubType(addpropertysearch);
        }
        if (city_name && location_name && purpose && !area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname(addpropertysearch);
        }
        if (city_name && location_name && purpose && area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit(addpropertysearch);
        }
        if (city_name && location_name && purpose && area_unit_name && beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber(addpropertysearch);
        }
        if (city_name && location_name && purpose && area_unit_name && beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType(addpropertysearch);
        }
        if (city_name && location_name && purpose && min_price && max_price && min_area && max_area && area_unit_name && beds && property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType_PropertySubType(addpropertysearch);
        }
        else {
            return null;
        }

    }
}
