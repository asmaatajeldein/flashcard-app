import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFlashcardDto, EditFlashcardDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FlashcardService {
  constructor(private prismaService: PrismaService) {}

  async createFlashcard(args: {
    deckId: number;
    dto: CreateFlashcardDto;
    userId: number;
  }) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: args.deckId },
    });

    if (deck.userId !== args.userId)
      throw new UnauthorizedException(`Unauthorized access to resources`);

    if (!deck)
      throw new NotFoundException(`Cannot find deck with id ${args.deckId}`);

    const flashcard = await this.prismaService.flashcard.create({
      data: {
        deckId: args.deckId,
        ...args.dto,
      },
    });

    return { message: 'Flashcard was created successfully.', flashcard };
  }

  async getFlashcards(args: { deckId: number; userId: number }) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: args.deckId },
    });

    if (deck.userId !== args.userId)
      throw new UnauthorizedException(`Unauthorized access to resources`);

    if (!deck)
      throw new NotFoundException(`Cannot find deck with id ${args.deckId}`);

    const flashcards = await this.prismaService.flashcard.findMany({
      where: { deckId: args.deckId },
    });

    if (!flashcards) return null;

    return { flashcards };
  }

  async getFlashcardById(args: {
    deckId: number;
    flashcardId: number;
    userId: number;
  }) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: args.deckId },
    });

    if (deck.userId !== args.userId)
      throw new UnauthorizedException(`Unauthorized access to resources`);

    if (!deck)
      throw new NotFoundException(`Cannot find deck with id ${args.deckId}`);

    const flashcard = await this.prismaService.flashcard.findFirst({
      where: {
        deckId: args.deckId,
        id: args.flashcardId,
      },
    });

    if (!flashcard)
      throw new NotFoundException(
        `Cannot find flashcard with id ${args.flashcardId}`,
      );

    return { flashcard };
  }

  async editFlashcardById(args: {
    deckId: number;
    flashcardId: number;
    dto: EditFlashcardDto;
    userId: number;
  }) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: args.deckId },
    });

    if (deck.userId !== args.userId)
      throw new UnauthorizedException(`Unauthorized access to resources`);

    if (!deck)
      throw new NotFoundException(`Cannot find deck with id ${args.deckId}`);

    const flashcard = await this.prismaService.flashcard.findUnique({
      where: { id: args.flashcardId },
    });

    if (!flashcard)
      throw new NotFoundException(
        `Cannot find flashcard with id ${args.deckId}`,
      );

    const updatedFlashcard = await this.prismaService.flashcard.update({
      where: {
        deckId: args.deckId,
        id: args.flashcardId,
      },
      data: { ...args.dto },
    });

    return { updatedFlashcard };
  }

  async deleteFlashcardById(args: {
    deckId: number;
    flashcardId: number;
    userId: number;
  }) {
    const deck = await this.prismaService.deck.findUnique({
      where: { id: args.deckId },
    });

    if (deck.userId !== args.userId)
      throw new UnauthorizedException(`Unauthorized access to resources`);

    if (!deck)
      throw new NotFoundException(`Cannot find deck with id ${args.deckId}`);

    const flashcard = await this.prismaService.flashcard.findUnique({
      where: { id: args.flashcardId },
    });

    if (!flashcard)
      throw new NotFoundException(
        `Cannot find flashcard with id ${args.deckId}`,
      );

    const deletedFlashcard = await this.prismaService.flashcard.delete({
      where: {
        deckId: args.deckId,
        id: args.flashcardId,
      },
    });

    return { message: 'Flashcard deleted successfully', deletedFlashcard };
  }
}
