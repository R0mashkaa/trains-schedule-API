import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class StationsDto {
  @ApiProperty({ example: 'Kyiv-Pas 1' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ example: 'Kyiv' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  city: string;
}
