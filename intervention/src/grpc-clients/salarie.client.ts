import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

interface SalarieResponse {
  id: number;
  nom: string;
  prenom: string;
}

interface GetSalariesResponse {
  salaries: SalarieResponse[];
  total: number;
}

interface DeleteSalarieResponse {
  success: boolean;
  message: string;
}

interface SalarieGrpcService {
  getSalarie(data: { id: number }): Promise<SalarieResponse>;
  getSalaries(data: { page?: number; limit?: number }): Promise<GetSalariesResponse>;
  createSalarie(data: { nom: string; prenom: string }): Promise<SalarieResponse>;
  updateSalarie(data: { id: number; nom: string; prenom: string }): Promise<SalarieResponse>;
  deleteSalarie(data: { id: number }): Promise<DeleteSalarieResponse>;
}

@Injectable()
export class SalarieGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'salarie',
      protoPath: join(__dirname, '../proto/salarie.proto'),
      url: process.env.SALARIE_GRPC_URL || 'localhost:50051',
    },
  })
  private client: ClientGrpc;

  private salarieService: SalarieGrpcService;

  onModuleInit() {
    this.salarieService = this.client.getService<SalarieGrpcService>('SalarieService');
  }

  async getSalarie(id: number): Promise<SalarieResponse> {
    try {
      return await this.salarieService.getSalarie({ id });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du salarié ${id}: ${error.message}`);
    }
  }

  async getSalaries(page: number = 1, limit: number = 10): Promise<GetSalariesResponse> {
    try {
      return await this.salarieService.getSalaries({ page, limit });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des salariés: ${error.message}`);
    }
  }

  async createSalarie(data: { nom: string; prenom: string }): Promise<SalarieResponse> {
    try {
      return await this.salarieService.createSalarie(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création du salarié: ${error.message}`);
    }
  }

  async updateSalarie(id: number, data: { nom: string; prenom: string }): Promise<SalarieResponse> {
    try {
      return await this.salarieService.updateSalarie({ id, ...data });
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du salarié ${id}: ${error.message}`);
    }
  }

  async deleteSalarie(id: number): Promise<DeleteSalarieResponse> {
    try {
      return await this.salarieService.deleteSalarie({ id });
    } catch (error) {
      throw new Error(`Erreur lors de la suppression du salarié ${id}: ${error.message}`);
    }
  }
}