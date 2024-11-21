import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/auth/users/entities/user.entity';

export const CurrentUser = createParamDecorator((data: never, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});