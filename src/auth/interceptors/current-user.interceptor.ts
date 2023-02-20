import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/common/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { role } = request.session;
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId, role);
      request.currentUser = user;
    }
    return handler.handle();
  }
}
