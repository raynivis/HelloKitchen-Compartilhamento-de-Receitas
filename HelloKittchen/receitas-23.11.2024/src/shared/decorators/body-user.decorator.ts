import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BodyUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return { ...req.body, user: req.user };
  },
);
