import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { HomeModule } from './home/home.module';
import { AddpropertyModule } from './addproperty/addproperty.module';
import { AuthModule } from './auth/auth.module';
import { UtilityService } from './utility/utility.service';
import { DeveloperModule } from './developer/developer.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), HomeModule, AddpropertyModule, AuthModule, DeveloperModule],
  controllers: [AppController],
  providers: [AppService, UtilityService],
})
export class AppModule {}
