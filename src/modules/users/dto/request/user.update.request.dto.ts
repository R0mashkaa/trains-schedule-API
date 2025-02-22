import { UsersDto } from '../users.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(UsersDto) {}
