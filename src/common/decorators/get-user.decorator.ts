import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

import { JwtPayload } from 'jsonwebtoken';
import { UsersRoleEnum } from '@prisma/client';

export interface ApiJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: UsersRoleEnum;
}
