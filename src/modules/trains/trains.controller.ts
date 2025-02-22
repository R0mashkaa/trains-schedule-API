import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi, Roles } from '@app/common';
import { UsersRoleEnum } from '@prisma/client';
import { UpdateTrainDto, TrainsResponse, CreateTrainDto } from './dto';
import { TrainsService } from './trains.service';

@LoggerApi()
@ApiBearerAuth()
@ApiTags('trains')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[CreateTrain]',
    description: 'Create train',
  })
  @ApiResponse({ type: TrainsResponse })
  @HttpCode(HttpStatus.OK)
  async create(@Body() data: CreateTrainDto): Promise<TrainsResponse> {
    return await this.trainsService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: '[GetAllTrains]',
    description: 'Get all trains',
  })
  @ApiResponse({ type: TrainsResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<TrainsResponse[]> {
    return await this.trainsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '[GetTrainById]',
    description: 'Get train by id',
  })
  @ApiResponse({ type: TrainsResponse })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<TrainsResponse> {
    return await this.trainsService.findById(id);
  }

  @Put(':id')
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[UpdateTrainById]',
    description: 'Update train by id',
  })
  @ApiResponse({ type: TrainsResponse })
  @HttpCode(HttpStatus.OK)
  async updateById(@Param('id') id: string, @Body() data: UpdateTrainDto): Promise<TrainsResponse> {
    return await this.trainsService.updateById(id, data);
  }

  @Delete(':id')
  @Roles(UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[DeleteTrain]',
    description: 'Delete by train id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string): Promise<TrainsResponse> {
    return await this.trainsService.deleteById(id);
  }
}
