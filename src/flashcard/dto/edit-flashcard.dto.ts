import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditFlashcardDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  front: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  back: string;
}
