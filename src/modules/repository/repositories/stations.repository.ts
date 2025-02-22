import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStationDto } from '@modules/stations/dto';
import { stations, Prisma } from '@prisma/client';

@Injectable()
export class StationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStationDto): Promise<stations> {
    return this.prisma.stations.create({
      data,
    });
  }

  async findAll(query?: Prisma.stationsFindManyArgs): Promise<stations[]> {
    return this.prisma.stations.findMany(query);
  }

  async findOne(query: Prisma.stationsFindFirstArgs): Promise<stations> {
    return this.prisma.stations.findFirst(query);
  }

  async update(id: string, data: Partial<stations>): Promise<stations> {
    return this.prisma.stations.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<stations> {
    return this.prisma.stations.delete({
      where: { id },
    });
  }
}
