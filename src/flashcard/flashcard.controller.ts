import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { CreateFlashcardDto, EditFlashcardDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller()
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  createFlashcard(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Body() dto: CreateFlashcardDto,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.createFlashcard({ deckId, dto, userId });
  }

  @Get()
  getFlashcards(
    @Param('deckId', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.getFlashcards({ deckId, userId });
  }

  @Get(':id')
  getFlashcardById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('id', ParseIntPipe) flashcardId: number,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.getFlashcardById({
      deckId,
      flashcardId,
      userId,
    });
  }

  @Patch(':id')
  editFlashcardById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('id', ParseIntPipe) flashcardId: number,
    @Body() dto: EditFlashcardDto,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.editFlashcardById({
      deckId,
      flashcardId,
      dto,
      userId,
    });
  }

  @Delete(':id')
  remove(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('id', ParseIntPipe) flashcardId: number,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.deleteFlashcardById({
      deckId,
      flashcardId,
      userId,
    });
  }
}
