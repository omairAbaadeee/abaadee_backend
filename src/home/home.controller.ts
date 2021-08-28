import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { Partner } from 'src/entity/paetner.entity';
import { Homepopup } from 'src/entity/popup.entity';
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
    async uploadedFile(@UploadedFile() file,@Body()  advertisementdto:Advertisementdto) {
      const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
      
  
    console.log(advertisementdto)
    
     return this.homeservice.addAdvertisement(advertisementdto,response);

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
    @Get("advertise_for_popular")
    getadvertise_for_popular(@Query("page_name") page_name, @Query("position") position:string):Promise<Advertisement[]>{
       console.log(page_name,position)
        return this.homeservice.getadvertise_for_popular(page_name,position);
    }
    @Get("getalladvertise")
    getalladvertise():Promise<Advertisement[]>{
        return this.homeservice.getalladvertize();
    }
    @Post("delete_advertise")
    deleteadertise(@Body() body):Promise<any>{
      return this.homeservice.deleteadvertise(body.id);
    }
    //feature Agency
    @Post('featureagency')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/featureagency',
                filename: editFileName,

            }),
            fileFilter: imageFileFilter,
        }),

    )
    async uploadMultipleFiles(@UploadedFile() file,@Body() body):Promise<any> {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
        return this.homeservice.addagency(response.filename,body.f_link);
    }
    @Get("agencyimage/:imagename")
    findagencyimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/featureagency/' + imagename)));
    }

    @Get("featureagency")
    getagency():Promise<FeatureAgency[]> {
        return this.homeservice.getagency();
    }
    @Post("delete_agency")
    deleteagency(@Body() body):Promise<any>{
      return this.homeservice.deleteageency(body.id);
    }
    //Partner
    @Post('addpartner')
    @UseInterceptors(
        FileInterceptor('partner_image', {
            storage: diskStorage({
                destination: './uploads/partner',
                filename: editFileName,

            }),
            fileFilter: imageFileFilter,
        }),

    )
    async Addpartner(@UploadedFile() file,@Body() body):Promise<any> {
        console.log(file)
        console.log(body.partner_link)
        const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
       return this.homeservice.Addpartner(response.filename,body.partner_link);
    }
    @Get("partnerimage/:imagename")
    findpartner(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/partner/'+imagename)));
    }
    @Get("getpartner")
    getpartner():Promise<Partner[]> {
       return this.homeservice.getpartner();
    }
    //Home POPUP
    @Post('addpopup')
    @UseInterceptors(
        FileInterceptor('homepopup_image', {
            storage: diskStorage({
                destination: './uploads/homepopup',
                filename: editFileName,

            }),
            fileFilter: imageFileFilter,
        }),

    )
    async AddPOPUP(@UploadedFile() file,@Body() body):Promise<any> {
        console.log(file)
        console.log(body.homepopup_link)
        const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
       return this.homeservice.AddPOPUP(response.filename,body.homepopup_link);
    }
    @Get("homepopupimage/:imagename")
    findpopupimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/homepopup/'+imagename)));
    }
    @Get("getpopup")
    getpopup():Promise<Homepopup>{
      return this.homeservice.getpopup();
    }

}
