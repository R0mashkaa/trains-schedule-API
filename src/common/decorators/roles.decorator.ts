import { SetMetadata } from '@nestjs/common';
import { UsersRoleEnum } from '@prisma/client';

export const Roles = (...roles: UsersRoleEnum[]) => SetMetadata('roles', roles);
