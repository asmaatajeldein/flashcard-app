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
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('flashcards')
@UseGuards(JwtGuard)
@Controller()
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @ApiCreatedResponse({ description: 'Flashcard was created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access to resources' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @Post()
  createFlashcard(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Body() dto: CreateFlashcardDto,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.createFlashcard({ deckId, dto, userId });
  }

  @ApiOkResponse({ description: "Gets all deck's flashcards" })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access to resources' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @Get()
  getFlashcards(
    @Param('deckId', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
  ) {
    return this.flashcardService.getFlashcards({ deckId, userId });
  }

  @ApiOkResponse({ description: 'Gets specific flashcard in a deck' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access to resources' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @ApiNotFoundResponse({ description: 'Cannot find specified flashcard' })
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

  @ApiOkResponse({ description: 'Flashcard created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access to resources' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @ApiNotFoundResponse({ description: 'Cannot find specified flashcard' })
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

  @ApiOkResponse({ description: 'Flashcard deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access to resources' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @ApiNotFoundResponse({ description: 'Cannot find specified flashcard' })
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
