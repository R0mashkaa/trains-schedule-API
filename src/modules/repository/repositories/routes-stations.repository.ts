import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { routesStations, Prisma } from '@prisma/client';
import { CreateRouteStationDto } from '@modules/routes-stations/dto';

@Injectable()
export class RoutesStationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRouteStationDto): Promise<routesStations> {
    return this.prisma.routesStations.create({
      data,
    });
  }

  async findAll(query?: Prisma.routesStationsFindManyArgs): Promise<routesStations[]> {
    return this.prisma.routesStations.findMany(query);
  }

  async findOne(query: Prisma.routesStationsFindFirstArgs): Promise<routesStations> {
    return this.prisma.routesStations.findFirst(query);
  }

  async update(id: string, data: Partial<routesStations>): Promise<routesStations> {
    return this.prisma.routesStations.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<routesStations> {
    return this.prisma.routesStations.delete({
      where: { id },
    });
  }
}
