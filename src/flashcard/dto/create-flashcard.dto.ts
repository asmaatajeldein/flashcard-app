import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlashcardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  front: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  back: string;
}
