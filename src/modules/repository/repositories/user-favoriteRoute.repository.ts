import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { userFavoriteTrains, Prisma } from '@prisma/client';
import { CreateUserFavoriteDto } from '@modules/user-favoriteTrain';

@Injectable()
export class UserFavoriteRouteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateUserFavoriteDto): Promise<userFavoriteTrains> {
    return this.prisma.userFavoriteTrains.create({
      data: {
        userId,
        trainId: data.trainId,
      },
    });
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
                  },
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
