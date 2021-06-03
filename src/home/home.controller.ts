import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { editFileName, imageFileFilter } from 'src/addproperty/file.upload';
import { Advertisementdto } from 'src/dto/Advertisement.dto';
import { Contactdto } from 'src/dto/contact.dto';
import { City } from 'src/entity/city.entity';
import { Contact } from 'src/entity/contact.entity';
import { Country } from 'src/entity/country.entity';
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
    
    @Get("image/:imagename")
    findimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/Advertisement/'+imagename)));
    }
    
    @Post("/upload")
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/Advertisement',
                filename: editFileName,
                
            }),
            fileFilter: imageFileFilter,
        }),

    )
    async uploadedFile(@UploadedFile() file,advertisementdto:Advertisementdto) {
      const response = {
            originalname: file.originalname,
            filename: file.filename,
            imagePath: file.path
        };
      // const ORIGINAL_IMAGE ="./uploads/Advertisement/"+response.filename;
      
      // const LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Australian_Defence_Force_Academy_coat_of_arms.svg/1200px-Australian_Defence_Force_Academy_coat_of_arms.svg.png";
      
      // const LOGO_MARGIN_PERCENTAGE = 5;
      
      // const FILENAME = "test.jpg";
      
      // const main = async () => {
      //   const [image, logo] = await Promise.all([
      //     Jimp.read(ORIGINAL_IMAGE),
      //     Jimp.read(LOGO)
      //   ]);
      
      //   logo.resize(image.bitmap.width / 10, Jimp.AUTO);
      
      //   const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
      //   const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
      
      //   const X = image.bitmap.width - logo.bitmap.width - xMargin;
      //   const Y = image.bitmap.height - logo.bitmap.height - yMargin;
      
      //   return image.composite(logo, X, Y, [
      //     {
      //       mode: Jimp.BLEND_SCREEN,
      //       opacitySource: 0.1,
      //       opacityDest: 1
      //     }
      //   ]);
      // };
      
      // main().then(image => image.write(FILENAME));
      // console.log(FILENAME)
  
    
      this.homeservice.addAdvertisement(advertisementdto,response);

        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
            data: response,
        };
    }
}
