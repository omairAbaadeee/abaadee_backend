import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AreaSize } from 'src/entity/area_size.entity';
import { Areaofunit } from 'src/entity/area_unit.entity';
import { Bathrooms } from 'src/entity/bathroom.entity';
import { Beds } from 'src/entity/beds.entity';
import { City } from 'src/entity/city.entity';
import { Price } from 'src/entity/price.entity';
import { PropertyType } from 'src/entity/property_type.entity';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private homeservice: HomeService) { }

    //working on price 
    @Get("/price")
    GetAllPrice(): Promise<Price[]> {
        return this.homeservice.getallprice();
    }


    @Post("/price")
    createprice(
        @Body("price") prices: string) {
        //   console.log(prices);
        this.homeservice.createprice(prices);

    }
    //Working on bed
    @Post("/bed")
    createbed(
        @Body("bed_quaintity") bed_quaintity: number) {
        //console.log(c_name,s_name,city_name,l_name);
        this.homeservice.createbed(bed_quaintity);

    }
    @Get("/bed")
    GetAllbed(): Promise<Beds[]> {
        return this.homeservice.getallbed();
    }
    //Working on areasize
    @Post("/areasize")
    createareasize(
        @Body("area_size") area_size: number) {
        //console.log(c_name,s_name,city_name,l_name);
        this.homeservice.createareasize(area_size);
    }
    @Get("/areasize")
    GetAllareasize(): Promise<AreaSize[]> {
        return this.homeservice.getallareasize();
    }
    //Working on areaunit
    @Post("/areaunit")
    createareaunit(
        @Body("area_name") area_name: string) {
        //console.log(c_name,s_name,city_name,l_name);
        this.homeservice.createareaunit(area_name);

    }
    @Get("/areaunit")
    GetAllareaunit(): Promise<Areaofunit[]> {
        return this.homeservice.getallareaunit();
    }

   
    @Post("/country")
    createcountry(
     ) {
        //console.log(c_name,s_name,city_name,l_name);
    //this.homeservice.createcountry();

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
    @Post("/country")
    create(){
      //  this.homeservice.createcountry();
    }

   //Propertytype and Catogory
    @Get("PropertyType")
    getallpropertytypeAndCatogory():Promise<PropertyType[]>{
        return this.homeservice.getallPropertytype();
    }

    //Bathroom
    @Get("bathroom")
    getallbath():Promise<Bathrooms[]>{
        return  this.homeservice.getallbathrooom();
    }
    @Post("bathroom")
    createbath(@Body("b_quaintity") b_quaintity:number){
         this.homeservice.createbathroom(b_quaintity);
    }
    @Post("PropertyType")
    Createpropertytypeandcatogory(){
    this.homeservice.createPropertycatogory();
    }
}
