import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { UserRepository } from 'src/reposatory/user.repository';
import { UtilityService } from 'src/utility/utility.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[ScheduleModule.forRoot(),TypeOrmModule.forFeature([UserRepository,CityRepository,LocationRepository]),
  PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'topsecret',
      signOptions:{
        expiresIn:3600,
      },
    }),
],
  controllers: [AuthController],
  providers: [AuthService,UtilityService,JwtStrategy,FacebookStrategy,GoogleStrategy],
  exports:[AuthModule,JwtStrategy,PassportModule]
})
export class AuthModule {}
