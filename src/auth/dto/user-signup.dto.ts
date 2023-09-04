import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
