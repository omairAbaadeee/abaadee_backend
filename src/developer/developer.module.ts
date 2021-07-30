import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectimageRepository } from 'src/reposatory/projectimage.reposatory';
import { ProjectRepository } from 'src/reposatory/projectrepo.reposatry';
import { DeveloperRepository } from 'src/reposatory/developerrepo.reposatory';
import { MemberlistRepository } from 'src/reposatory/memberlist.reposatory';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { Project_AminitiesRepository } from 'src/reposatory/projectaminities.reposatory';
import { AgentReposatory } from 'src/reposatory/agent.reposatory';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectRepository,DeveloperRepository,
    ProjectimageRepository,MemberlistRepository,CityRepository,LocationRepository
    ,Project_AminitiesRepository,AgentReposatory])],
  providers: [DeveloperService],
  controllers: [DeveloperController]
})
export class DeveloperModule {}
