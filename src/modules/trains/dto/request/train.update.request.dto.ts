import { PartialType } from '@nestjs/swagger';
import { TrainsDto } from '../trains.dto';

export class UpdateTrainDto extends PartialType(TrainsDto) {}
