import { IsOptional, IsString } from 'class-validator';

export class EditFlashcardDto {
  @IsOptional()
  @IsString()
  front: string;

  @IsOptional()
  @IsString()
  back: string;
}
