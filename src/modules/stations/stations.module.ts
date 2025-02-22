import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositoryModule';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';

const imports = [RepositoryModule];
const providers = [StationsService];

@Module({
  imports,
  providers,
  controllers: [StationsController],
  exports: providers,
})
export class StationsModule {}
