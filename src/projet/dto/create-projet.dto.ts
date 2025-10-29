import { IsString, IsNotEmpty, Length, IsInt, IsPositive } from 'class-validator';

export class CreateProjetDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nom: string;

  @IsInt()
  @IsPositive()
  clientId: number;
}