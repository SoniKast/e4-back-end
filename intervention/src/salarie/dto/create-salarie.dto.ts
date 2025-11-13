import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateSalarieDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  nom: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  prenom: string;
}