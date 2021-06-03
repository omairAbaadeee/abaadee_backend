import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectimageRepository } from 'src/reposatory/projectimage.reposatory';
import { ProjectRepository } from 'src/reposatory/projectrepo.reposatry';
import { DeveloperRepository } from 'src/reposatory/developerrepo.reposatory';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectRepository,DeveloperRepository,
    ProjectimageRepository])],
  providers: [DeveloperService],
  controllers: [DeveloperController]
})
export class DeveloperModule {}
