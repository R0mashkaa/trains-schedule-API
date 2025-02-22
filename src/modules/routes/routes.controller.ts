import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi, Roles } from '@app/common';
import { UpdateRouteDto, RoutesResponse, CreateRouteDto } from './dto';
import { RoutesService } from 'src/modules/routes/routes.service';
import { UsersRoleEnum } from '@prisma/client';

@LoggerApi()
@ApiBearerAuth()
@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[CreateRoute]',
    description: 'Create route',
  })
  @ApiResponse({ type: RoutesResponse })
  @HttpCode(HttpStatus.OK)
  async create(@Body() data: CreateRouteDto): Promise<RoutesResponse> {
    return await this.routesService.create(data);
  }

  @Get()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[GetAllRoutes]',
    description: 'Get all routes',
  })
  @ApiResponse({ type: RoutesResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<RoutesResponse[]> {
    return await this.routesService.findAll();
  }

  @Get(':id')
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[GetRouteById]',
    description: 'Get route by id',
  })
  @ApiResponse({ type: RoutesResponse })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<RoutesResponse> {
    return await this.routesService.findById(id);
  }

  @Put(':id')
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[UpdateRouteById]',
    description: 'Update route by id',
  })
  @ApiResponse({ type: RoutesResponse })
  @HttpCode(HttpStatus.OK)
  async updateById(@Param('id') id: string, @Body() data: UpdateRouteDto): Promise<RoutesResponse> {
    return await this.routesService.updateById(id, data);
  }

  @Delete(':id')
  @Roles(UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[DeleteRoute]',
    description: 'Delete by route id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string): Promise<RoutesResponse> {
    return await this.routesService.deleteById(id);
  }
}
