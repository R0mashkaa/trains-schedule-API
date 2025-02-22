import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { routes, Prisma } from '@prisma/client';
import { CreateRouteDto } from '@modules/routes/dto';

@Injectable()
export class RoutesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRouteDto): Promise<routes> {
    return this.prisma.routes.create({
      data,
    });
  }

  async findAll(query?: Prisma.routesFindManyArgs): Promise<routes[]> {
    return this.prisma.routes.findMany({
      ...query,
      include: {
        stations: true,
      },
    });
  }

  async findOne(query: Prisma.routesFindFirstArgs): Promise<routes> {
    return this.prisma.routes.findFirst({
      ...query,
      include: {
        stations: true,
      },
    });
  }

  async update(id: string, data: Partial<routes>): Promise<routes> {
    return this.prisma.routes.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<routes> {
    return this.prisma.routes.delete({
      where: { id },
    });
  }
}
