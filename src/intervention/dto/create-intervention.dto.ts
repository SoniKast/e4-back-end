export class CreateInterventionDto {
  date: Date;
  duree: number;
  projetId: number;
  salarieId: number;
  materiels?: { designation: string }[];
}