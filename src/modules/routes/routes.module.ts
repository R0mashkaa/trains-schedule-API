import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositoryModule';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

const imports = [RepositoryModule];
const providers = [RoutesService];

@Module({
  imports,
  providers,
  controllers: [RoutesController],
  exports: providers,
})
export class RoutesModule {}
