import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto, UserLoginDto } from './dto';

import { ApiOkResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from './types';
import { JwtGuard, RtGuard } from './guard';
import { GetUser } from './decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ description: 'Access token is provided' })
  @ApiForbiddenResponse({ description: 'Credentials taken' })
  @Post('local/signup')
  signup(@Body() dto: UserSignupDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @ApiOkResponse({ description: 'Access token is provided' })
  @ApiForbiddenResponse({ description: 'Invalid credentials' })
  @Post('local/login')
  login(@Body() dto: UserLoginDto): Promise<Tokens> {
    return this.authService.loginLocal(dto);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@GetUser('id') userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(
    @GetUser('sub') userId: number,
    @GetUser('refresh_token') rt: string,
  ) {
    return this.authService.refreshTokens(userId, rt);
  }
}
