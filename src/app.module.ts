import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard, RolesGuard } from '@modules/auth/guards';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@app/config';

// Modules
import {
  RepositoryModule,
  UsersModule,
  AuthModule,
  RoutesModule,
  StationsModule,
  RoutesStationsModule,
  TrainsModule,
} from '@app/modules';
import { UserFavoriteTrainsModule } from "src/modules/user-favoriteTrain";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),
    RepositoryModule,
    AuthModule,
    UsersModule,
    RoutesModule,
    StationsModule,
    RoutesStationsModule,
    TrainsModule,
    UserFavoriteTrainsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
