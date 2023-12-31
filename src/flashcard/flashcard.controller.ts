import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { CreateFlashcardDto, EditFlashcardDto } from './dto';
import { GetUser } from 'src/common/decorators';

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

  @Get(':flashcardId')
  getFlashcardById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('flashcardId', ParseIntPipe) flashcardId: number,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.getFlashcardById({
      deckId,
      flashcardId,
      userId,
    });
  }

  @Patch(':flashcardId')
  editFlashcardById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('flashcardId', ParseIntPipe) flashcardId: number,
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

  @Delete(':flashcardId')
  remove(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('flashcardId', ParseIntPipe) flashcardId: number,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.deleteFlashcardById({
      deckId,
      flashcardId,
      userId,
    });
  }
}
