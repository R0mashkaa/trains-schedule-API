import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { errorHandler, LoggerServiceDecorator } from '@app/common';
import { RoutesRepository } from '@repositoryModule';
import { CreateRouteDto, RoutesResponse, UpdateRouteDto } from './dto';

@Injectable()
export class RoutesService {
  constructor(private routesRepository: RoutesRepository) {}

  @LoggerServiceDecorator()
  async create(data: CreateRouteDto): Promise<RoutesResponse> {
    try {
      return await this.routesRepository.create(data);
    } catch (error) {
      await errorHandler('create', 'Routes', error);
    }
  }

  @LoggerServiceDecorator()
  async findAll(): Promise<RoutesResponse[]> {
    try {
      return await this.routesRepository.findAll();
    } catch (error) {
      await errorHandler('findAll', 'Routes', error);
    }
  }

  @LoggerServiceDecorator()
  async findById(id: string): Promise<RoutesResponse> {
    try {
      const existsRoute = await this.routesRepository.findOne({ where: { id } });

      if (!existsRoute) {
        throw new NotFoundException('Route not found');
      }

      return existsRoute;
    } catch (error) {
      await errorHandler('findById', 'Routes', error);
    }
  }

  @LoggerServiceDecorator()
  async updateById(id: string, data: UpdateRouteDto): Promise<RoutesResponse> {
    try {
      const existsRoute = await this.routesRepository.findOne({ where: { id } });

      if (!existsRoute) {
        throw new BadRequestException('Route not found');
      }

      return await this.routesRepository.update(id, data);
    } catch (error) {
      await errorHandler('updateById', 'Routes', error);
    }
  }

  @LoggerServiceDecorator()
  async deleteById(id: string): Promise<RoutesResponse> {
    try {
      const existsRoute = await this.routesRepository.findOne({ where: { id } });

      if (!existsRoute) {
        throw new BadRequestException('Route not found');
      }

      return await this.routesRepository.delete(id);
    } catch (error) {
      await errorHandler('deleteById', 'Routes', error);
    }
  }
}
