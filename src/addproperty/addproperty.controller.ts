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
import { Pagination } from 'nestjs-typeorm-paginate';
import { url } from 'src/Global/Variable';
import { Agentsdto } from 'src/dto/agent.dto';
import { PropertyContactdto } from 'src/dto/propertycontact.dto';
import { Watermark } from 'src/Watermark/watermark';
var watermark = require('image-watermark');
@Controller('addproperty')
export class AddpropertyController {
    constructor(
        private addproservice: AddpropertyService
    ) { }


    @Get("non_verified")
    Addproperty():Promise<Addproperty[]>{
        return  this.addproservice.non_varified();
        
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
        @GetUser() user: User):Promise<any> {
            console.log(addpropertydto);
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                filename: file.filename,
            };
            Watermark('./uploads/logo/logo.png', "./uploads/images/"+fileReponse.filename);
            response.push(fileReponse);
        });
        
 
        this.addproservice.addproperty(addpropertydto,user,response);
        return {
            status: HttpStatus.OK,
            message: 'Property uploaded successfully!',
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
    getdatabypurpose(  @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,@Param('purpose') purpose: string):Promise<Pagination<Addproperty>> {
        return this.addproservice.find_data_From_Purpose({
            page,
            limit,
            route:  url+'/addproperty/getpropertydata',
          },purpose);

    }
   
    @Get("databyid/:id")
    Getalldatabyid(@Param("id") id:number): Promise<Addproperty[]>{
       
        return this.addproservice.getalldata(id);

    }

    @Post("getpropertydata")

    findpropertydata( @Query('page') page: number = 1,
    @Query('limit') limit: number = 11,
    @Body() addpropertysearch: AddpropertySearch): Promise<Pagination<Addproperty>> {
        limit = limit > 100 ? 100 : limit;
        const { purpose, city_name, location_name, property_catogory, min_price, max_price, min_area, max_area, beds, area_unit_name } = addpropertysearch;
       // console.log(addpropertysearch);
        if (!city_name && purpose && !location_name && !area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_Purpose({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch.purpose);
        }
        if (city_name && purpose && !location_name && !area_unit_name && !beds && !property_catogory) {

            return this.addproservice.find_data_From_cityname({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        if (location_name && purpose && !city_name && !area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_locationname({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }

        if (area_unit_name && purpose && !city_name && !location_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_AreaUnit({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        if (beds && purpose && !city_name && !location_name && !area_unit_name && !property_catogory) {
            return this.addproservice.find_data_From_Bed({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }

        if (property_catogory && purpose && !city_name && !location_name && !area_unit_name && !beds) {
            return this.addproservice.find_data_From_PropertySubType({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        if (city_name && location_name && purpose && !area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        if (city_name && location_name && purpose && area_unit_name && !beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        if (city_name && location_name && purpose && area_unit_name && beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        if (city_name && location_name && purpose && area_unit_name && beds && !property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        if (city_name && location_name && purpose && min_price && max_price && min_area && max_area && area_unit_name && beds && property_catogory) {
            return this.addproservice.find_data_From_Cityname_Locationname_BathroomNumber_AreaUnit_BedNumber_PropertyType_PropertySubType({
                page,
                limit,
                route: url+'/addproperty/getpropertydata',
              },addpropertysearch);
        }
        else {
            return null;
        }

    }
    //front page link 
    @Get("homelinks1/:catogory/:purpose/:cityname")
    Links(@Query('page') page: number = 1,
    @Query('limit') limit: number = 11,
    @Param('purpose') purpose: string,
    @Param('cityname') cityname: string,
    @Param('catogory') catogory: string):Promise<Pagination<Addproperty>> {
        return this.addproservice.Get_data_From_cityname({
            page,
            limit,
            route: url+'/addproperty/homelinks1/'+catogory+'/'+purpose+'/'+cityname,
          },purpose,cityname,catogory);
    }


    @Get("homelinks2/:catogory/:purpose/:locationname")
    Links2(@Query('page') page: number = 1,
    @Query('limit') limit: number = 11,
    @Param('purpose') purpose: string,
    @Param('locationname') locationname: string,
    @Param('catogory') catogory: string):Promise<Pagination<Addproperty>> {
        return this.addproservice.Get_data_From_location({
            page,
            limit,
            route: url+'/addproperty/homelinks2/'+catogory+'/'+purpose+'/'+locationname,
          },purpose,locationname,catogory);
    }

    @Post("verified_property")
    async Varified_property(@Body("id") id:number):Promise<any>{
      return  await this.addproservice.varified_property(id);
    }
    @Post('/addagent')
    signIn(@Body() agentsdto:Agentsdto) {
     console.log(agentsdto);
     return this.addproservice.addagent(agentsdto);
    }

    @Post("property_contact")
    propertyContact(@Body() propertycontactdto:PropertyContactdto){
      console.log(propertycontactdto)
      
    }


    
}

