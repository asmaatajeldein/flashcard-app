import { IsOptional, IsString } from 'class-validator';

export class EditDeckDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
