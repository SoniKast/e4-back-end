import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsPositive } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nom: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  prenom: string;

  @IsInt()
  @IsPositive()
  roleId: number;
}