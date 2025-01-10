import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategy/jwt-strategy';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
