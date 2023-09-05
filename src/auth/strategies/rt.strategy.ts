import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtPayload, jwtPayloadWithRt } from '../types';
import { Request } from 'express';

@Injectable()
export class RtStartegy extends PassportStrategy(Strategy, 'rt') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('RT_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: jwtPayload): jwtPayloadWithRt {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refresh_token: refreshToken,
    };
  }
}
