import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiJwtPayload, GetUser, LoggerApi } from '@app/common';
import { UserFavoriteRouteResponse, CreateUserFavoriteDto } from './dto';
import { UserFavoriteTrainsService } from './user-favoriteTrains.service';

@LoggerApi()
@ApiBearerAuth()
@ApiTags('user-favoriteTrains')
@Controller('user-favoriteTrains')
export class UserFavoriteTrainController {
  constructor(private readonly userFavoriteTrainsService: UserFavoriteTrainsService) {}

  @Post()
  @ApiOperation({
    summary: '[AddUserFavoriteRoute]',
    description: 'Add user favorite route',
  })
  @ApiResponse({ type: UserFavoriteRouteResponse })
  @HttpCode(HttpStatus.OK)
  async create(@GetUser() user: ApiJwtPayload, @Body() data: CreateUserFavoriteDto): Promise<UserFavoriteRouteResponse> {
    return await this.userFavoriteTrainsService.create(user.id, data);
  }

  @Get()
  @ApiOperation({
    summary: '[GetAllUserFavoriteRoutes]',
    description: 'Get all user favorite trains',
  })
  @ApiResponse({ type: UserFavoriteRouteResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  async getAll(
    @GetUser() user: ApiJwtPayload,
  ): Promise<UserFavoriteRouteResponse[]> {
    return await this.userFavoriteTrainsService.findAll(user.id);
  }

  @Delete(':trainId')
  @ApiOperation({
    summary: '[DeleteUserFavoriteRoute]',
    description: 'Delete by user favorite route id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(
    @GetUser() user: ApiJwtPayload,
    @Param('trainId') trainId: string): Promise<UserFavoriteRouteResponse> {
    return await this.userFavoriteTrainsService.deleteById(user.id, trainId);
  }
}
