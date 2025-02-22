import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTrainDto } from '@modules/trains/dto';
import { trains, Prisma } from '@prisma/client';

@Injectable()
export class TrainsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTrainDto): Promise<trains> {
    return this.prisma.trains.create({
      data,
    });
  }

  async findAll(query?: Prisma.trainsFindManyArgs): Promise<trains[]> {
    return this.prisma.trains.findMany({
      ...query,
      include: {
        route: {
          include: {
            stations: {
              include: {
                Station: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(query: Prisma.trainsFindFirstArgs): Promise<trains> {
    return this.prisma.trains.findFirst({
      ...query,
      include: {
        route: true,
      },
    });
  }

  async update(id: string, data: Partial<trains>): Promise<trains> {
    return this.prisma.trains.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<trains> {
    return this.prisma.trains.delete({
      where: { id },
    });
  }
}
