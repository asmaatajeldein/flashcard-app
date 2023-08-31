import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { UserDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: UserDto) {
    try {
      // hash the password
      const hashedPassword = await argon.hash(dto.password);

      // create user
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: UserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('invalid credentials');

    const isMatch = argon.verify(user.hash, dto.password);

    if (!isMatch) throw new ForbiddenException('invalid credentials');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };

    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m',
    });

    return {
      access_token: token,
    };
  }
}
