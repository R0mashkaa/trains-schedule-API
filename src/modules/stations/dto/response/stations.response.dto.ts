import { StationsDto } from '../stations.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class StationsResponse extends StationsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

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
