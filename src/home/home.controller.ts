import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { editFileName, imageFileFilter } from 'src/addproperty/file.upload';
import { Advertisementdto } from 'src/dto/Advertisement.dto';
import { Contactdto } from 'src/dto/contact.dto';
import { Advertisement } from 'src/entity/advertisement.entity';
import { City } from 'src/entity/city.entity';
import { Contact } from 'src/entity/contact.entity';
import { Country } from 'src/entity/country.entity';
import { FeatureAgency } from 'src/entity/featureagency.entity';
import { HomeService } from './home.service';
const Jimp = require("jimp");

@Controller('home')
export class HomeController {
    constructor(private homeservice: HomeService) { }

    @Get("/country")
    country():Promise<Country[]> {

    return this.homeservice.getallcountry();

    }
    @Get("/country/:countryname")
    getcountrybyname(@Param("countryname")countryname:string):Promise<Country> {

    return this.homeservice.getaonecountry(countryname);

    }


    //Country
    @Get("/city")
    GetAllcountry(): Promise<City[]> {
       return this.homeservice.getallcity();
    }
    @Get("/city/:cityname")
    Getlocationbycity(@Param("cityname") cityname:string): Promise<City[]> {
       return this.homeservice.getalllacation(cityname);
    }
 

   //Propertytype and Catogory
    // @Get("PropertyType")
    // getallpropertytypeAndCatogory():Promise<PropertyType[]>{
    //     return this.homeservice.getallPropertytype();
    // }

    // //Bathroom
    // @Get("bathroom")
    // getallbath():Promise<Bathrooms[]>{
    //     return  this.homeservice.getallbathrooom();
    // }
    // @Post("bathroom")
    // createbath(@Body("b_quaintity") b_quaintity:number){
    //      this.homeservice.createbathroom(b_quaintity);
    // }
    @Post("contact")
    Createpropertytypeandcatogory(@Body() contactdto:Contactdto):Promise<any>{
     return this.homeservice.contactus(contactdto);
    }
    @Get("contact")
    getallcontact():Promise<Contact[]>{
       return this.homeservice.getallcontact();
    }
    
    @Get("Advertisement/:imagename")
    findimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/Advertisement/'+imagename)));
    }
    
    @Post("/advertize")
    @UseInterceptors(
        FileInterceptor('advertisement_image', {
            storage: diskStorage({
                destination: './uploads/Advertisement',
                filename: editFileName,
                
            }),
            fileFilter: imageFileFilter,
        }),

    )
    async uploadedFile(@UploadedFile() file,@Body() advertisementdto:Advertisementdto) {
      const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
      
  
    console.log(file)
    console.log(advertisementdto)
      this.homeservice.addAdvertisement(advertisementdto,response);

        // return {
        //     status: HttpStatus.OK,
        //     message: 'Image uploaded successfully!',
        //     data: response,
        // };
    }

    @Get("advertise/:pagename")
    getadvertize(@Param("pagename") pagename):Promise<Advertisement[]> {
        return this.homeservice.getadvertize(pagename);
    }

    @Post('featureagency')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/developer',
                filename: editFileName,

            }),
            fileFilter: imageFileFilter,
        }),

    )
    async uploadMultipleFiles(@UploadedFiles() file,@Body() body):Promise<any> {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
        this.homeservice.addagency(response.imagePath,body.f_link);
    }
    @Get("image/:imagename")
    findagencyimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/Agency/' + imagename)));
    }

    @Get("featureagency")
    getagency():Promise<FeatureAgency[]> {
        return this.homeservice.getagency();
    }

}
