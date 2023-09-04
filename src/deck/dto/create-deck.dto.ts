import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeckDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
