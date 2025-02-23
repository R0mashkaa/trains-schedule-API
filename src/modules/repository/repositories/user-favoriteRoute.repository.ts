import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { userFavoriteTrains, Prisma } from '@prisma/client';

@Injectable()
export class UserFavoriteRouteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any): Promise<userFavoriteTrains> {
    return this.prisma.userFavoriteTrains.create({ data });
  }

  async findAll(query?: Prisma.userFavoriteTrainsFindManyArgs): Promise<userFavoriteTrains[]> {
    return this.prisma.userFavoriteTrains.findMany({
      ...query,
      include: {
        Train: {
          include: {
            Route: {
              include: {
                stations: {
                  include: {
                    Station: true,
                  }
                },
              },
            },
          },
        },
      },
    });
  }


  async findOne(query: Prisma.userFavoriteTrainsFindFirstArgs): Promise<userFavoriteTrains> {
    return this.prisma.userFavoriteTrains.findFirst(query);
  }

  async delete(id: string): Promise<userFavoriteTrains> {
    return this.prisma.userFavoriteTrains.delete({
      where: { id },
    });
  }
}
