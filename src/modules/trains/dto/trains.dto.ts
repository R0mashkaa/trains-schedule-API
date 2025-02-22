import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TrainsDto {
  @ApiProperty({ example: 'Kyiv-Lviv' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ example: '140k' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  number: string;
}
