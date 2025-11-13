import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SalarieService } from './salarie.service';

interface GetSalarieRequest {
  id: number;
}

interface GetSalariesRequest {
  page: number;
  limit: number;
}

interface CreateSalarieRequest {
  nom: string;
  prenom: string;
}

interface UpdateSalarieRequest {
  id: number;
  nom: string;
  prenom: string;
}

interface DeleteSalarieRequest {
  id: number;
}

@Controller()
export class SalarieController {
  constructor(private readonly salarieService: SalarieService) {}

  @GrpcMethod('SalarieService', 'GetSalarie')
  async getSalarie(data: GetSalarieRequest) {
    const salarie = await this.salarieService.findOne(data.id);
    if (!salarie) {
      throw new Error(`Salarié avec l'ID ${data.id} non trouvé`);
    }
    return salarie;
  }

  @GrpcMethod('SalarieService', 'GetSalaries')
  async getSalaries(data: GetSalariesRequest) {
    const page = data.page || 1;
    const limit = data.limit || 10;
    return await this.salarieService.findAll(page, limit);
  }

  @GrpcMethod('SalarieService', 'CreateSalarie')
  async createSalarie(data: CreateSalarieRequest) {
    return await this.salarieService.create({
      nom: data.nom,
      prenom: data.prenom,
    });
  }

  @GrpcMethod('SalarieService', 'UpdateSalarie')
  async updateSalarie(data: UpdateSalarieRequest) {
    const salarie = await this.salarieService.update(data.id, {
      nom: data.nom,
      prenom: data.prenom,
    });
    
    if (!salarie) {
      throw new Error(`Salarié avec l'ID ${data.id} non trouvé`);
    }
    
    return salarie;
  }

  @GrpcMethod('SalarieService', 'DeleteSalarie')
  async deleteSalarie(data: DeleteSalarieRequest) {
    const success = await this.salarieService.remove(data.id);
    return {
      success,
      message: success 
        ? `Salarié avec l'ID ${data.id} supprimé avec succès`
        : `Salarié avec l'ID ${data.id} non trouvé`,
    };
  }
}