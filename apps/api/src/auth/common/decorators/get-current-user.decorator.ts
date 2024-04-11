import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRt } from 'src/auth/types/jwtPayloadWIthRt.types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user
    if (!data) return user;
    delete user.hash;
    return user[data]; 
  },
);
