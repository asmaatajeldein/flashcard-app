import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { UserLoginDto, UserSignupDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: UserSignupDto) {
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

      const tokens = await this.getTokens(user.id, user.email);
      this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      throw error;
    }
  }

  async loginLocal(dto: UserLoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('invalid credentials');

    const isMatch = argon.verify(user.hash, dto.password);
    if (!isMatch) throw new ForbiddenException('invalid credentials');

    const tokens = await this.getTokens(user.id, user.email);
    this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number) {
    await this.prismaService.user.update({
      where: { id: userId, hashedRt: { not: null } },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };

    const [at, rt] = await Promise.all([
      await this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      await this.jwt.signAsync(payload, {
        secret: this.config.get('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    // update the hashedRt for the user
    await this.prismaService.user.update({
      where: { id: userId },
      data: { hashedRt: hash },
    });
  }
}
