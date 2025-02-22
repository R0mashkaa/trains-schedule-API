import { UsersDto } from '../users.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UsersRoleEnum } from '@prisma/client';

export class UsersResponse extends UsersDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: UsersRoleEnum.USER })
  @IsEnum(UsersRoleEnum)
  @Expose()
  role: UsersRoleEnum;

  @ApiProperty({ example: '2025-01-15T00:00:00.000Z' })
  @IsNotEmpty()
  @Type(() => Date)
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-01-15T00:00:00.000Z' })
  @IsNotEmpty()
  @Type(() => Date)
  @Expose()
  updatedAt: Date;
}
