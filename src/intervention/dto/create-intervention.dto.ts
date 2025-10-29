import { IsDate, IsInt, IsPositive, Min } from 'class-validator';

export class CreateInterventionDto {
  @IsDate()
  date: Date;

  @IsInt()
  @IsPositive()
  @Min(1)
  duree: number;

  @IsInt()
  @IsPositive()
  projetId: number;

  @IsInt()
  @IsPositive()
  salarieId: number;

  @IsInt()
  @IsPositive()
  materielId: number;
}