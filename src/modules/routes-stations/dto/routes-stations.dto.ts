import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RoutesStationsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Expose()
  routeId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Expose()
  stationId: string;

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

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  track: string;
}
