import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthRepository } from '../auth/auth.repository';
import { ApiRequest } from '../types/apiRequest';

@Injectable()
export class AttachUserDataInterceptor implements NestInterceptor {
  constructor(private readonly authRepository: AuthRepository) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<ApiRequest>();
    if (!req.user) return next.handle();
    const user = await this.authRepository.findUserById(req.user.id);
    if (!user) return next.handle();
    req.user = user;

    return next.handle();
  }
}
