import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateMaterielDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  designation: string;
}