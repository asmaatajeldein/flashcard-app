import {
  Controller,
  Delete,
  Get,
  Param,
  Body,
  Post,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { DeckService } from './deck.service';
import { CreateDeckDto, EditDeckDto } from './dto';

@Controller()
export class DeckController {
  constructor(private deckService: DeckService) {}

  // get all user decks
  @Get()
  getDecks(@GetUser('id') userId: number) {
    return this.deckService.getDecks(userId);
  }

  // get a specific deck
  @Get(':deckId')
  getDeckById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
  ) {
    return this.deckService.getDeckById(userId, deckId);
  }

  // create a deck
  @Post()
  createDeck(@Body() dto: CreateDeckDto, @GetUser('id') userId: number) {
    return this.deckService.createDeck(userId, dto);
  }

  // update a deck
  @Patch(':deckId')
  editDeckById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
    @Body() dto: EditDeckDto,
  ) {
    return this.deckService.editDeckById(userId, deckId, dto);
  }

  // remove a deck
  @Delete(':deckId')
  deleteDeckById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
  ) {
    return this.deckService.deleteDeckById(userId, deckId);
  }
}
