import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Email de l\'utilisateur', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur', example: 'password123', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'Dupont', minLength: 2 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nom: string;

  @ApiProperty({ description: 'Prénom de l\'utilisateur', example: 'Jean', minLength: 2 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  prenom: string;

  @ApiProperty({ description: 'ID du rôle de l\'utilisateur', example: 1, type: Number })
  @IsInt()
  @IsPositive()
  roleId: number;
}