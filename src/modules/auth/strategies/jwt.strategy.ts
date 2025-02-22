import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getConfig } from '@app/config';
import { UsersRepository } from '@repositoryModule';
import { UsersRoleEnum } from '@prisma/client';

interface PayloadInterface {
  id: string;
  role: UsersRoleEnum;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getConfig().jwt_secret,
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Token expired');
    }

    return { id: payload.id, role: payload.role };
  }
}
