import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';

// Repositories
import {
  RoutesRepository,
  RoutesStationsRepository,
  StationsRepository,
  TrainsRepository,
  UserFavoriteRouteRepository,
  UsersRepository,
} from "./repositories";

const providers = [
  ConfigService,
  PrismaService,
  UsersRepository,
  RoutesRepository,
  StationsRepository,
  RoutesStationsRepository,
  TrainsRepository,
  UserFavoriteRouteRepository,
];

@Global()
@Module({
  providers,
  exports: providers,
})
export class RepositoryModule {}
