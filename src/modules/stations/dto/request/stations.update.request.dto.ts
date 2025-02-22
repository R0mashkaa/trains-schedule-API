import { StationsDto } from '../stations.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateStationDto extends PartialType(StationsDto) {}
