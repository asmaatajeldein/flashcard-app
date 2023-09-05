import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeckDto, EditDeckDto } from './dto';

@Injectable()
export class DeckService {
  constructor(private prismaService: PrismaService) {}

  async getDecks(userId: number) {
    const allDecks = await this.prismaService.deck.findMany({
      where: { userId },
    });
    return allDecks;
  }

  async getDeckById(userId: number, deckId: number) {
    const deck = await this.prismaService.deck.findFirst({
      where: { id: deckId, userId },
    });

    if (!deck) return new NotFoundException('Cannot find specified deck');

    return deck;
  }

  async createDeck(userId: number, dto: CreateDeckDto) {
    const deck = await this.prismaService.deck.create({
      data: {
        userId,
        ...dto,
      },
    });

    return { message: 'Deck was created successfully', deck };
  }

  async editDeckById(userId: number, deckId: number, dto: EditDeckDto) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: deckId },
    });

    if (deck && deck.userId !== userId)
      throw new UnauthorizedException('Unauthorized access to resources');

    if (!deck)
      throw new NotFoundException(
        `Cannot find deck with id ${deckId} for the user ${userId}`,
      );

    const editDeck = await this.prismaService.deck.update({
      where: { id: deckId },
      data: {
        ...dto,
      },
    });

    return { message: 'Deck was updated successfully', deck: editDeck };
  }

  async deleteDeckById(userId: number, deckId: number) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: deckId },
    });

    if (deck && deck.userId !== userId)
      throw new UnauthorizedException(
        'Unauthorized access to resources denied',
      );

    if (!deck)
      throw new NotFoundException(
        `Cannot find deck with id ${deckId} for the user ${userId}`,
      );

    await this.prismaService.deck.delete({
      where: { id: deckId },
    });

    return { message: 'Deck was deleted successfully', deck };
  }
}
