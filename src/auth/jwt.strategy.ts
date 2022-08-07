import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    if (!payload || !payload.id) {
      throw new UnauthorizedException('Invalid token or does not exists');
    }

    const user = this.authService.findUserByPayload(payload);
    if (!user) {
      throw new UnauthorizedException('Token does not belongs to any user');
    }

    return user;
  }
}
