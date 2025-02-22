import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ApiJwtPayload, errorHandler, LoggerServiceDecorator } from '@app/common';
import { UsersRepository } from '@repositoryModule';
import { UpdateUserDto, UsersResponse } from './dto';
import { UsersRoleEnum } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  @LoggerServiceDecorator()
  async findAll(): Promise<UsersResponse[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      await errorHandler('findAll', 'Users', error);
    }
  }

  @LoggerServiceDecorator()
  async findById(id: string): Promise<UsersResponse> {
    try {
      const existsUser = await this.usersRepository.findOne({ where: { id } });

      if (!existsUser) {
        throw new NotFoundException('User not found');
      }

      return existsUser;
    } catch (error) {
      await errorHandler('findById', 'Users', error);
    }
  }

  @LoggerServiceDecorator()
  async updateById(id: string, data: UpdateUserDto): Promise<UsersResponse> {
    try {
      const existsUser = await this.usersRepository.findOne({ where: { id } });

      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      return await this.usersRepository.update(id, data);
    } catch (error) {
      await errorHandler('updateById', 'Users', error);
    }
  }

  @LoggerServiceDecorator()
  async roleUpdate(userId: string, user: ApiJwtPayload, role: UsersRoleEnum): Promise<UsersResponse> {
    try {
      if (user.id === userId) {
        throw new BadRequestException('You can`t change your role');
      }

      return await this.usersRepository.update(userId, { role });
    } catch (error) {
      await errorHandler('roleUpdate', 'Users', error);
    }
  }

  @LoggerServiceDecorator()
  async deleteById(id: string): Promise<UsersResponse> {
    try {
      const existsUser = await this.usersRepository.findOne({ where: { id } });

      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      return await this.usersRepository.delete(id);
    } catch (error) {
      await errorHandler('deleteById', 'Users', error);
    }
  }
}
