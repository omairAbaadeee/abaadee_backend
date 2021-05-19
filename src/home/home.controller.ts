import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Areaofunit } from 'src/entity/area_unit.entity';
import { City } from 'src/entity/city.entity';
import { Country } from 'src/entity/country.entity';
import { PropertyType } from 'src/entity/property_type.entity';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private homeservice: HomeService) { }

    //working on price 
    // @Get("/price")
    // GetAllPrice(): Promise<Price[]> {
    //     return this.homeservice.getallprice();
    // }


    // @Post("/price")
    // createprice(
    //     @Body("price") prices: string) {
    //     //   console.log(prices);
    //     this.homeservice.createprice(prices);

    // }
    // //Working on bed
    // @Post("/bed")
    // createbed(
    //     @Body("bed_quaintity") bed_quaintity: number) {
    //     //console.log(c_name,s_name,city_name,l_name);
    //     this.homeservice.createbed(bed_quaintity);

    // }
    // @Get("/bed")
    // GetAllbed(): Promise<Beds[]> {
    //     return this.homeservice.getallbed();
    // }
    // //Working on areasize
    // @Post("/areasize")
    // createareasize(
    //     @Body("area_size") area_size: number) {
    //     //console.log(c_name,s_name,city_name,l_name);
    //     this.homeservice.createareasize(area_size);
    // }
    // @Get("/areasize")
    // GetAllareasize(): Promise<AreaSize[]> {
    //     return this.homeservice.getallareasize();
    // }
    // //Working on areaunit
    // @Post("/areaunit")
    // createareaunit(
    //     @Body("area_name") area_name: string) {
    //     //console.log(c_name,s_name,city_name,l_name);
    //     this.homeservice.createareaunit(area_name);

    // }
    // @Get("/areaunit")
    // GetAllareaunit(): Promise<Areaofunit[]> {
    //     return this.homeservice.getallareaunit();
    // }

   
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
    // @Post("PropertyType")
    // Createpropertytypeandcatogory(){
    // this.homeservice.createPropertycatogory();
    // }
}
