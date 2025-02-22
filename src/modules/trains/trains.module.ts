import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositoryModule';
import { TrainsController } from './trains.controller';
import { TrainsService } from './trains.service';

const imports = [RepositoryModule];
const providers = [TrainsService];

@Module({
  imports,
  providers,
  controllers: [TrainsController],
  exports: providers,
})
export class TrainsModule {}
