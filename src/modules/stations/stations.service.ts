import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { errorHandler, LoggerServiceDecorator } from '@app/common';
import { StationsRepository } from '@repositoryModule';
import { CreateStationDto, StationsResponse, UpdateStationDto } from './dto';

@Injectable()
export class StationsService {
  constructor(private stationsRepository: StationsRepository) {}

  @LoggerServiceDecorator()
  async create(data: CreateStationDto): Promise<StationsResponse> {
    try {
      return await this.stationsRepository.create(data);
    } catch (error) {
      await errorHandler('create', 'Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async findAll(): Promise<StationsResponse[]> {
    try {
      return await this.stationsRepository.findAll();
    } catch (error) {
      await errorHandler('findAll', 'Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async findById(id: string): Promise<StationsResponse> {
    try {
      const existsStation = await this.stationsRepository.findOne({ where: { id } });

      if (!existsStation) {
        throw new NotFoundException('Route not found');
      }

      return existsStation;
    } catch (error) {
      await errorHandler('findById', 'Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async updateById(id: string, data: UpdateStationDto): Promise<StationsResponse> {
    try {
      const existsStation = await this.stationsRepository.findOne({ where: { id } });

      if (!existsStation) {
        throw new BadRequestException('Route not found');
      }

      return await this.stationsRepository.update(id, data);
    } catch (error) {
      await errorHandler('updateById', 'Stations', error);
    }
  }

  @LoggerServiceDecorator()
  async deleteById(id: string): Promise<StationsResponse> {
    try {
      const existsRoute = await this.stationsRepository.findOne({ where: { id } });

      if (!existsRoute) {
        throw new BadRequestException('Route not found');
      }

      return await this.stationsRepository.delete(id);
    } catch (error) {
      await errorHandler('deleteById', 'Stations', error);
    }
  }
}
