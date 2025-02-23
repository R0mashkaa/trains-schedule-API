import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositoryModule';
import { UserFavoriteTrainController } from './user-favoriteTrain.controller';
import { UserFavoriteTrainsService } from './user-favoriteTrains.service';

const imports = [RepositoryModule];
const providers = [UserFavoriteTrainsService];

@Module({
  imports,
  providers,
  controllers: [UserFavoriteTrainController],
  exports: providers,
})
export class UserFavoriteTrainsModule {}
