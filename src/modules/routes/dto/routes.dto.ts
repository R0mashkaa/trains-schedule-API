import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID, IsDate } from 'class-validator';

export class RoutesDto {
  @ApiProperty({ example: '2025-02-22T12:00:00.000Z' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  departure: Date;

  @ApiProperty({ example: '2025-02-22T15:30:00.000Z' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  arrive: Date;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @IsOptional()
  @IsUUID()
  @Expose()
  trainId?: string;
}
