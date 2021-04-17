import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '57116762787-4gq35ug7sn35o6um587k0689djueqbu5.apps.googleusercontent.com',
            clientSecret: 'eG6aVHcczFgw3bH1QxtSUTK3',
            callbackURL: 'http://localhost:3200/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos,city} = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,     
            // city  :    city[0].value,   
            accessToken
        }
        done(null, user);
    }
}