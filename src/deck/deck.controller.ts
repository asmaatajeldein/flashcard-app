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
import { GetUser } from 'src/auth/decorator';
import { DeckService } from './deck.service';
import { CreateDeckDto, EditDeckDto } from './dto';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('decks')
@ApiBearerAuth('JWT-auth')
@Controller()
export class DeckController {
  constructor(private deckService: DeckService) {}

  // get all user decks
  @ApiOkResponse({ description: "Gets all user's decks" })
  @Get()
  getDecks(@GetUser('id') userId: number) {
    return this.deckService.getDecks(userId);
  }

  // get a specific deck
  @ApiOkResponse({ description: 'Gets specified deck' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @Get(':id')
  getDeckById(
    @Param('id', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
  ) {
    return this.deckService.getDeckById(userId, deckId);
  }

  // create a deck
  @ApiCreatedResponse({ description: 'Deck was created successfully' })
  @Post()
  createDeck(@Body() dto: CreateDeckDto, @GetUser('id') userId: number) {
    return this.deckService.createDeck(userId, dto);
  }

  // update a deck
  @ApiCreatedResponse({ description: 'Deck was updated successfully' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @ApiUnauthorizedResponse({ description: 'Access to resources denied' })
  @Patch(':id')
  editDeckById(
    @Param('id', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
    @Body() dto: EditDeckDto,
  ) {
    return this.deckService.editDeckById(userId, deckId, dto);
  }

  // remove a deck
  @ApiOkResponse({ description: 'Deck was deleted successfully' })
  @ApiNotFoundResponse({ description: 'Cannot find specified deck' })
  @ApiUnauthorizedResponse({ description: 'Access to resources denied' })
  @Delete(':id')
  deleteDeckById(
    @Param('id', ParseIntPipe) deckId: number,
    @GetUser('id') userId: number,
  ) {
    return this.deckService.deleteDeckById(userId, deckId);
  }
}
