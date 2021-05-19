import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Addpropertydto } from 'src/dto/addproerty.dto';
import { AddpropertyService } from './addproperty.service';
import { editFileName, imageFileFilter } from './file.upload';
import { diskStorage } from 'multer';
import { join, parse } from 'path';
import { Observable, of } from 'rxjs';
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
        //console.log(files)
    
        //const data=eval(feature);
     
  
        // const array1 = [];
        // array1.push(addpropertydto.features);


        // var second1;
           // array1.pop();
        // array1.forEach(first => {
        //     first.forEach(second => {
        // //const stringified = JSON.stringify(second)
        // console.log(second)
             
        //         // const parsedObj = JSON.parse(stringified);
            
        //        // const data=JSON.stringify(second);
        //     //    second.replace("[object Object]","")
            
        //         //second1=second;
                
        //         // var parse1 = JSON.parse(second)
        //         // const { general_information, main_features, utilities, business_and_communication, facing } = parse1;
        //         // // main_features1=main_features;
        //         // console.log(general_information)
        //         // console.log(main_features)
        //         // console.log(utilities)
        //         // console.log(business_and_communication)
        //         // console.log(facing)


        //         //console.log(main_features,utilities,facing);
        //         //this.addproservice.addfeature(main_features);
        //     })
        // })

        //     for(var i=0;i<second1.lenght-1;i++){
        //         var parse1= JSON.parse(second1)

        //         const {general_information,main_features,utilities,business_and_communication,facing}=parse1;
        //         // main_features1=main_features;
        //         console.log(general_information)
        //         console.log(main_features)
        //         console.log(utilities)
        //         console.log(business_and_communication)
        //         console.log(facing)

        //    }
        //    const data=eval(feature);
        //    data.forEach(data=>{
        //      console.log(data);
        //      const stringified = JSON.stringify(data);
        //     const parsedObj = JSON.parse(stringified);
        //      const {general_information,main_features,utilities,business_and_communication,facing}=parsedObj;
        //      console.log(general_information)
        //    })
        //console.log(data,typeof(data));


        const response = [];
        files.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        this.addproservice.addproperty(addpropertydto,user,response);
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
    Getalldatabyid(@Param("id") id:number):Promise<Addproperty[]>{
        return this.addproservice.getalldata(id);

    }

    @Post("getpropertydata")

    findpropertydata(@Body() addpropertysearch: AddpropertySearch): Promise<Addproperty[]> {
        const { purpose, city_name, location_name, property_catogory, min_price, max_price, min_area, max_area, beds, area_unit_name } = addpropertysearch;
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
