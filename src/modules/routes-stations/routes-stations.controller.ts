import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi, Roles } from '@app/common';
import { UsersRoleEnum } from '@prisma/client';
import { UpdateRouteStationDto, RoutesStationsResponse, CreateRouteStationDto } from './dto';
import { RoutesStationsService } from './routes-stations.service';

@LoggerApi()
@ApiBearerAuth()
@ApiTags('routes-stations')
@Controller('routes-stations')
export class RoutesStationsController {
  constructor(private readonly routesStationsService: RoutesStationsService) {}

  @Post()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[CreateStation]',
    description: 'Create route-station',
  })
  @ApiResponse({ type: RoutesStationsResponse })
  @HttpCode(HttpStatus.OK)
  async create(@Body() data: CreateRouteStationDto): Promise<RoutesStationsResponse> {
    return await this.routesStationsService.create(data);
  }

  @Get()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[GetAllStations]',
    description: 'Get all routes-stations',
  })
  @ApiResponse({ type: RoutesStationsResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<RoutesStationsResponse[]> {
    return await this.routesStationsService.findAll();
  }

  @Get(':id')
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[GetStationById]',
    description: 'Get route-station by id',
  })
  @ApiResponse({ type: RoutesStationsResponse })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<RoutesStationsResponse> {
    return await this.routesStationsService.findById(id);
  }

  @Put(':id')
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[UpdateStationById]',
    description: 'Update route-station by id',
  })
  @ApiResponse({ type: RoutesStationsResponse })
  @HttpCode(HttpStatus.OK)
  async updateById(@Param('id') id: string, @Body() data: UpdateRouteStationDto): Promise<RoutesStationsResponse> {
    return await this.routesStationsService.updateById(id, data);
  }

  @Delete(':id')
  @Roles(UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[DeleteStation]',
    description: 'Delete by route-station id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string): Promise<RoutesStationsResponse> {
    return await this.routesStationsService.deleteById(id);
  }
}
