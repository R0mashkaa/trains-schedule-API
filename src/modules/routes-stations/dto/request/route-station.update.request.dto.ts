import { RoutesStationsDto } from '../routes-stations.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateRouteStationDto extends PartialType(RoutesStationsDto) {}
