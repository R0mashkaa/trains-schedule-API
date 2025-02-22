import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsersDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'example@mail.com' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @ApiProperty({ example: '12345678' })
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}
