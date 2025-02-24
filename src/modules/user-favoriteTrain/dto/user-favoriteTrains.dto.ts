import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserFavoriteTrainsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Expose()
  userId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Expose()
  trainId: string;
}
