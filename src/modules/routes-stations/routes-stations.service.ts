import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { errorHandler, LoggerServiceDecorator } from '@app/common';
import { RoutesStationsRepository } from '@repositoryModule';
import { CreateRouteStationDto, RoutesStationsResponse, UpdateRouteStationDto } from './dto';

@Injectable()
export class RoutesStationsService {
  constructor(private routesStationsRepository: RoutesStationsRepository) {}

  @LoggerServiceDecorator()
  async create(data: CreateRouteStationDto): Promise<RoutesStationsResponse> {
    try {
      return await this.routesStationsRepository.create(data);
    } catch (error) {
      await errorHandler('create', 'Routes-Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async findAll(): Promise<RoutesStationsResponse[]> {
    try {
      return await this.routesStationsRepository.findAll();
    } catch (error) {
      await errorHandler('findAll', 'Routes-Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async findById(id: string): Promise<RoutesStationsResponse> {
    try {
      const existsRouteStation = await this.routesStationsRepository.findOne({ where: { id } });

      if (!existsRouteStation) {
        throw new NotFoundException('Route not found');
      }

      return existsRouteStation;
    } catch (error) {
      await errorHandler('findById', 'Routes-Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async updateById(id: string, data: UpdateRouteStationDto): Promise<RoutesStationsResponse> {
    try {
      const existsRouteStation = await this.routesStationsRepository.findOne({ where: { id } });

      if (!existsRouteStation) {
        throw new BadRequestException('Route not found');
      }

      return await this.routesStationsRepository.update(id, data);
    } catch (error) {
      await errorHandler('updateById', 'Routes-Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async deleteById(id: string): Promise<RoutesStationsResponse> {
    try {
      const existsRouteStation = await this.routesStationsRepository.findOne({ where: { id } });

      if (!existsRouteStation) {
        throw new BadRequestException('Route not found');
      }

      return await this.routesStationsRepository.delete(id);
    } catch (error) {
      await errorHandler('deleteById', 'Routes-Stations', error);
    }
  }
}
