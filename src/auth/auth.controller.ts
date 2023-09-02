import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto';

import { ApiOkResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ description: 'Access token is provided' })
  @ApiForbiddenResponse({ description: 'Credentials taken' })
  @Post('signup')
  signup(@Body() dto: UserDto) {
    return this.authService.signup(dto);
  }

  @ApiOkResponse({ description: 'Access token is provided' })
  @ApiForbiddenResponse({ description: 'Invalid credentials' })
  @Post('login')
  login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }
}
