import {
  Controller,
  Delete,
  Get,
  Param,
  Body,
  Post,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { DeckService } from './deck.service';
import { CreateDeckDto, EditDeckDto } from './dto';

@UseGuards(JwtGuard)
@Controller('decks')
export class DeckController {
  constructor(private deckService: DeckService) {}

  // get all user decks
  @Get()
  getDecks(@GetUser('id') userId: number) {
    return this.deckService.getDecks(userId);
  }

  // get a specific deck
  @Get(':id')
  getDeckById(
    @Param('id', ParseIntPipe) deckId: number,
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
  @Patch(':id')
  editDeckById(
    @Param('id', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
    @Body() dto: EditDeckDto,
  ) {
    return this.deckService.editDeckById(userId, deckId, dto);
  }

  // remove a deck
  @Delete(':id')
  deleteDeckById(
    @Param('id', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
  ) {
    return this.deckService.deleteDeckById(userId, deckId);
  }
}
