import { UserFavoriteTrainsDto } from '../user-favoriteTrains.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateUserFavoriteDto extends OmitType(UserFavoriteTrainsDto, ['userId'] as const) {}
