import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard, RolesGuard } from '@modules/auth/guards';
import { AppController } from './app.controller';
import { getConfig } from '@app/config';

// Modules
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import {
  RepositoryModule,
  UsersModule,
  AuthModule,
  RoutesModule,
  StationsModule,
  RoutesStationsModule,
  TrainsModule,
  UserFavoriteTrainsModule,
  TaskScheduleModule,
} from '@app/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),
    ScheduleModule.forRoot(),
    TaskScheduleModule,
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
  controllers: [AppController],
})
export class AppModule {}
