import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DeckModule } from './deck/deck.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { JwtGuard } from './common/guards';

const routes: Routes = [
  {
    path: '/decks',
    module: DeckModule,
    children: [{ path: ':deckId/flashcards', module: FlashcardModule }],
  },
];
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register(routes),
    PrismaModule,
    AuthModule,
    UserModule,
    DeckModule,
    FlashcardModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGuard }],
})
export class AppModule {}
