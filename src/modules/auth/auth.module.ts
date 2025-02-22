import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '@app/config';
import { RepositoryModule } from '@repositoryModule';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

const providers = [AuthService, JwtStrategy];
const imports = [
  JwtModule.register({
    secret: getConfig().jwt_secret,
    signOptions: {
      expiresIn: parseInt(getConfig().jwt_expires),
    },
  }),
  PassportModule,
  RepositoryModule,
];

@Module({
  imports,
  providers,
  controllers: [AuthController],
  exports: providers,
})
export class AuthModule {}
