import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { RtStartegy } from './strategies/rt.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy, RtStartegy],
  controllers: [AuthController],
})
export class AuthModule {}
