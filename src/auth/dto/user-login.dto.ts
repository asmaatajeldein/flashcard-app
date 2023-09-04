import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ example: 'person@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
