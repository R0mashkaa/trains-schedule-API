import { RoutesDto } from 'src/modules/routes/dto/routes.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateRouteDto extends PartialType(RoutesDto) {}
