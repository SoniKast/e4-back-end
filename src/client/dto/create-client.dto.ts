import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    nom: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    adresse: string;
}