import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '@modules/users/dto';
import { users, Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<users> {
    return this.prisma.users.create({
      data,
    });
  }

  async findAll(query?: Prisma.usersFindManyArgs): Promise<users[]> {
    return this.prisma.users.findMany({
      ...query,
      include: {
        favorite_routes: true,
      },
    });
  }

  async findOne(query: Prisma.usersFindManyArgs): Promise<users> {
    return this.prisma.users.findFirst({
      ...query,
      include: {
        favorite_routes: true,
      },
    });
  }

  async update(id: string, data: Partial<users>): Promise<users> {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<users> {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
