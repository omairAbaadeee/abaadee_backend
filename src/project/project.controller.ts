import { Controller, Get, Post, Body, Put, Param, Delete, UploadedFiles, UseInterceptors, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/addproperty/file.upload';
import { Project } from 'src/entity/project.entity';
import { join } from 'path';
import { Observable, of } from 'rxjs';


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
      // Start Project
      @Post('/project')
      @UseInterceptors(FileFieldsInterceptor( 
          [
          {name: 'fp_images', maxCount: 50,},
          {name: 'pp_images', maxCount: 50,},
          {name: 'pi_images', maxCount: 50,},
          {name: 'logo_image', maxCount: 1,},
          {name: 'cover_image', maxCount: 1,},
          ],
          {
          storage: diskStorage({
            destination: './uploads/project',
            filename: editFileName,
          }),
        fileFilter: imageFileFilter,
        },
      ),)
      uploadFile(@UploadedFiles() files,@Body() body) {
          console.log(files);
          console.log(body);
      
          const fp_images = [];
          files.fp_images.forEach(file => {
              const fileReponse = {
                  filename: file.filename,
              };
              fp_images.push(fileReponse);
          });
          console.log(fp_images);
  
          const pp_images = [];
          files.pp_images.forEach(file => {
              const fileReponse = {
                  filename: file.filename,
              };
              pp_images.push(fileReponse);
          });
          console.log(pp_images);
  
          const pi_images = [];
          files.pi_images.forEach(file => {
              const fileReponse = {
                  filename: file.filename,
              };
              pi_images.push(fileReponse);
          });
          console.log(pi_images);
  
          const logo_image = [];
          files.logo_image.forEach(file => {
              const fileReponse = {
                  filename: file.filename,
              };
              logo_image.push(fileReponse);
          });
          console.log(logo_image)
          const cover_image = [];
          files.cover_image.forEach(file => {
              const fileReponse = {
                  filename: file.filename,
              };
              cover_image.push(fileReponse);
          });
          console.log(cover_image)
  
          this.projectService.addproject(body,fp_images,pp_images,pi_images,logo_image,cover_image);
      
   
      }
      

  
  @Get("project/:id")
  getproject(@Param("id") id):Promise<Project>{
  
      return this.projectService.getproject(id);
  }
  @Get("shortproject")
  getshortproject():Promise<Project[]>{
      return this.projectService.getshortproject();
  }
  
  @Get("project_image/:imagename")
  projectimage(@Param("imagename") imagename: string, @Res() res): Observable<object> {
      return of(res.sendFile(join(process.cwd(), 'uploads/project/' + imagename)));
  }
  @Post("serchproject")
   projectserch(@Body() body):Promise<Project[]>{
       console.log(body)
       if(body.city && !body.project_type && !body.developer_title && !body.project_name){
        console.log(1)
        return this.projectService.searchprojectbycity(body.city);
       
       }
       if(body.city && body.project_type && !body.developer_title && !body.project_name){
        console.log(2)
      return this.projectService.searchprojectbycity_project_type(body.city,body.project_type);
       }
       if(body.city && body.project_type && body.developer_title && !body.project_name){
        console.log(3)
        return this.projectService.
        searchprojectbycity_project_type_developertitle(body.city,body.project_type,body.developer_title);
       } 
       if(body.city && body.project_type && body.developer_title && body.project_name){
        console.log(4)
        return this.projectService.searchprojectbycity_project_type_developertitle_projecttitle(body.city,body.project_type,body.developer_title,body.project_name)   
    }
    console.log("run")
    return this.projectService.searchprojectbyAll(body.city,body.project_type,body.developer_title,body.project_name);
  }
  //end project

}
