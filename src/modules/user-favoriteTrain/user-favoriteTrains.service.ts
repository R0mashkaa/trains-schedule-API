import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { errorHandler, LoggerServiceDecorator } from '@app/common';
import { TrainsRepository, UserFavoriteRouteRepository } from '@repositoryModule';
import { CreateUserFavoriteDto, UserFavoriteRouteResponse } from './dto';

@Injectable()
export class UserFavoriteTrainsService {
  constructor(private userFavoriteRouteRepository: UserFavoriteRouteRepository) {}

  @LoggerServiceDecorator()
  async create(userId, data: CreateUserFavoriteDto): Promise<UserFavoriteRouteResponse> {
    try {
      return await this.userFavoriteRouteRepository.create({ userId, ...data });
    } catch (error) {
      await errorHandler('create', 'UserFavorite', error);
    }
  }

  @LoggerServiceDecorator()
  async findAll(userId: string): Promise<UserFavoriteRouteResponse[]> {
    try {
      return await this.userFavoriteRouteRepository.findAll({ where: { userId } });
    } catch (error) {
      await errorHandler('findAll', 'UserFavorite', error);
    }
  }

  @LoggerServiceDecorator()
  async deleteById(userId: string, trainId: string): Promise<UserFavoriteRouteResponse> {
    try {
      const existsTrain = await this.userFavoriteRouteRepository.findOne({ where: { trainId, userId } });

      if (!existsTrain) {
        throw new BadRequestException('Route not found');
      }

      return await this.userFavoriteRouteRepository.delete(existsTrain.id);
    } catch (error) {
      await errorHandler('deleteById', 'UserFavorite', error);
    }
  }
}
