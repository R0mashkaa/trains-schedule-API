import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { errorHandler, LoggerServiceDecorator } from '@app/common';
import { TrainsRepository } from '@repositoryModule';
import { CreateTrainDto, TrainsResponse, UpdateTrainDto } from './dto';

@Injectable()
export class TrainsService {
  constructor(private trainsRepository: TrainsRepository) {}

  @LoggerServiceDecorator()
  async create(data: CreateTrainDto): Promise<TrainsResponse> {
    try {
      return await this.trainsRepository.create(data);
    } catch (error) {
      await errorHandler('create', 'Trains', error);
    }
  }

  @LoggerServiceDecorator()
  async findAll(from: string, to: string, date: string): Promise<TrainsResponse[]> {
    try {
      return await this.trainsRepository.findAll(from, to, new Date(date));
    } catch (error) {
      await errorHandler('findAll', 'Trains', error);
    }
  }

  @LoggerServiceDecorator()
  async findById(id: string): Promise<TrainsResponse> {
    try {
      const existsTrain = await this.trainsRepository.findOne({ where: { id } });

      if (!existsTrain) {
        throw new NotFoundException('Route not found');
      }

      return existsTrain;
    } catch (error) {
      await errorHandler('findById', 'Trains', error);
    }
  }

  @LoggerServiceDecorator()
  async updateById(id: string, data: UpdateTrainDto): Promise<TrainsResponse> {
    try {
      const existsTrain = await this.trainsRepository.findOne({ where: { id } });

      if (!existsTrain) {
        throw new BadRequestException('Route not found');
      }

      return await this.trainsRepository.update(id, data);
    } catch (error) {
      await errorHandler('updateById', 'Trains', error);
    }
  }

  @LoggerServiceDecorator()
  async deleteById(id: string): Promise<TrainsResponse> {
    try {
      const existsTrain = await this.trainsRepository.findOne({ where: { id } });

      if (!existsTrain) {
        throw new BadRequestException('Route not found');
      }

      return await this.trainsRepository.delete(id);
    } catch (error) {
      await errorHandler('deleteById', 'Trains', error);
    }
  }
}
