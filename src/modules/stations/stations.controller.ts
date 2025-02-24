import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi, Roles, Public } from '@app/common';
import { UsersRoleEnum } from '@prisma/client';
import { UpdateStationDto, StationsResponse, CreateStationDto } from './dto';
import { StationsService } from './stations.service';

@LoggerApi()
@ApiTags('stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[CreateStation]',
    description: 'Create station',
  })
  @ApiResponse({ type: StationsResponse })
  @HttpCode(HttpStatus.OK)
  async create(@Body() data: CreateStationDto): Promise<StationsResponse> {
    return await this.stationsService.create(data);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: '[GetAllStations]',
    description: 'Get all stations',
  })
  @ApiResponse({ type: StationsResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<StationsResponse[]> {
    return await this.stationsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[GetStationById]',
    description: 'Get station by id',
  })
  @ApiResponse({ type: StationsResponse })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<StationsResponse> {
    return await this.stationsService.findById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[UpdateStationById]',
    description: 'Update station by id',
  })
  @ApiResponse({ type: StationsResponse })
  @HttpCode(HttpStatus.OK)
  async updateById(@Param('id') id: string, @Body() data: UpdateStationDto): Promise<StationsResponse> {
    return await this.stationsService.updateById(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[DeleteStation]',
    description: 'Delete by station id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string): Promise<StationsResponse> {
    return await this.stationsService.deleteById(id);
  }
}
