import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositoryModule';
import { RoutesStationsService } from './routes-stations.service';
import { RoutesStationsController } from './routes-stations.controller';

const imports = [RepositoryModule];
const providers = [RoutesStationsService];

@Module({
  imports,
  providers,
  controllers: [RoutesStationsController],
  exports: providers,
})
export class RoutesStationsModule {}
