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

  async findAll(from: string, to: string, date: Date): Promise<trains[]> {
    return this.prisma.trains.findMany({
      where: {
        routeId: {
          not: null,
        },
        Route: {
          departure: {
            gte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
            // lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0),
          },
          stations: {
            some: {
              Station: {
                city: {
                  contains: from,
                  mode: 'insensitive',
                },
              },
            },
          },
          AND: {
            stations: {
              some: {
                Station: {
                  city: {
                    contains: to,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
        },
      },
      include: {
        Route: {
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
        Route: true,
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
