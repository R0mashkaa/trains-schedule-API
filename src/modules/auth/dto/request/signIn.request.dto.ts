import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class SignInDto {
  @ApiProperty({ example: 'example@mail.com' })
  @IsNotEmpty()
  @IsEmail()
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
