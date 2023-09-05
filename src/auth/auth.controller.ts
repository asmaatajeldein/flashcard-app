import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto, UserLoginDto } from './dto';

import { Tokens } from './types';
import { RtGuard } from '../common/guards';
import { GetUser, Public } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  signup(@Body() dto: UserSignupDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/login')
  login(@Body() dto: UserLoginDto): Promise<Tokens> {
    return this.authService.loginLocal(dto);
  }

  @Post('logout')
  logout(@GetUser('id') userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(
    @GetUser('sub') userId: number,
    @GetUser('refresh_token') rt: string,
  ) {
    return this.authService.refreshTokens(userId, rt);
  }
}
