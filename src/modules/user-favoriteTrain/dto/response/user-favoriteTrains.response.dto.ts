import { ApiProperty } from '@nestjs/swagger';
import { UserFavoriteTrainsDto } from '../user-favoriteTrains.dto';

export class UserFavoriteRouteResponse extends UserFavoriteTrainsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;
}
