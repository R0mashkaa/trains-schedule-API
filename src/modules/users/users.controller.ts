import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiJwtPayload, GetUser, LoggerApi, Roles } from '@app/common';
import { UpdateUserDto, UsersResponse } from './dto';
import { UsersService } from './users.service';
import { UsersRoleEnum } from '@prisma/client';

@LoggerApi()
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[GetAllUsers]',
    description: 'Get all users',
  })
  @ApiResponse({ type: UsersResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<UsersResponse[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[GetUserById]',
    description: 'Get user by id',
  })
  @ApiResponse({ type: UsersResponse })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<UsersResponse> {
    return await this.usersService.findById(id);
  }

  @Put(':id')
  @Roles(UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[UpdateUserById]',
    description: 'Update user by id',
  })
  @ApiResponse({ type: UsersResponse })
  @HttpCode(HttpStatus.OK)
  async updateById(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UsersResponse> {
    return await this.usersService.updateById(id, data);
  }
  @Put(':id/role')
  @Roles(UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[UpdateUserRoleById]',
    description: '[Admin] Find user by id and update role',
  })
  @ApiResponse({ type: UsersResponse })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'role', enum: UsersRoleEnum })
  async updateRoleById(
    @Param('id') id: string,
    @Query('role') role: UsersRoleEnum,
    @GetUser() user: ApiJwtPayload,
  ): Promise<UsersResponse> {
    return await this.usersService.roleUpdate(id, user, role);
  }

  @Delete(':id')
  @Roles(UsersRoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: '[DeleteUser]',
    description: 'Delete by user id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string): Promise<UsersResponse> {
    return await this.usersService.deleteById(id);
  }
}
