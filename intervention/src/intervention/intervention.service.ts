import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Intervention } from '@prisma/client';
import { SalarieGrpcClient } from '../grpc-clients/salarie.client';

@Injectable()
export class InterventionService {
  constructor(
    private prisma: PrismaService,
    private salarieGrpcClient: SalarieGrpcClient,
  ) {}

  async findAll(): Promise<any[]> {
    const interventions = await this.prisma.intervention.findMany({
      include: {
        projet: true,
        materiel: true
      },
    });

    // Enrichir chaque intervention avec les données du salarié via gRPC
    const enrichedInterventions = await Promise.all(
      interventions.map(async (intervention) => {
        try {
          const salarie = await this.salarieGrpcClient.getSalarie(intervention.salarieId);
          return {
            ...intervention,
            salarie,
          };
        } catch (error) {
          console.error(`Erreur lors de la récupération du salarié ${intervention.salarieId}:`, error.message);
          return {
            ...intervention,
            salarie: null,
          };
        }
      })
    );

    return enrichedInterventions;
  }

  async findOne(id: number): Promise<any | null> {
    const intervention = await this.prisma.intervention.findUnique({
      where: { id },
      include: {
        projet: true,
        materiel: true,
      },
    });

    if (!intervention) {
      return null;
    }

    // Récupérer les données du salarié via gRPC
    try {
      const salarie = await this.salarieGrpcClient.getSalarie(intervention.salarieId);
      return {
        ...intervention,
        salarie,
      };
    } catch (error) {
      console.error(`Erreur lors de la récupération du salarié ${intervention.salarieId}:`, error.message);
      return {
        ...intervention,
        salarie: null,
      };
    }
  }

  async create(data: {
    date: Date;
    duree: number;
    projetId: number;
    salarieId: number;
    materielId: number;
  }): Promise<any> {
    // Vérifier que le salarié existe via gRPC
    try {
      await this.salarieGrpcClient.getSalarie(data.salarieId);
    } catch (error) {
      throw new Error(`Salarié avec l'ID ${data.salarieId} non trouvé`);
    }

    const intervention = await this.prisma.intervention.create({
      data: {
        date: data.date,
        duree: data.duree,
        projetId: data.projetId,
        salarieId: data.salarieId,
        materielId: data.materielId,
      },
      include: {
        projet: true,
        materiel: true,
      },
    });

    // Récupérer les données du salarié via gRPC
    const salarie = await this.salarieGrpcClient.getSalarie(intervention.salarieId);
    
    return {
      ...intervention,
      salarie,
    };
  }

  async update(
    id: number,
    data: {
      date?: Date;
      duree?: number;
      projetId?: number;
      salarieId?: number;
    },
  ): Promise<any> {
    // Si on met à jour le salarieId, vérifier qu'il existe
    if (data.salarieId) {
      try {
        await this.salarieGrpcClient.getSalarie(data.salarieId);
      } catch (error) {
        throw new Error(`Salarié avec l'ID ${data.salarieId} non trouvé`);
      }
    }

    const intervention = await this.prisma.intervention.update({
      where: { id },
      data,
      include: {
        projet: true,
        materiel: true,
      },
    });

    // Récupérer les données du salarié via gRPC
    try {
      const salarie = await this.salarieGrpcClient.getSalarie(intervention.salarieId);
      return {
        ...intervention,
        salarie,
      };
    } catch (error) {
      console.error(`Erreur lors de la récupération du salarié ${intervention.salarieId}:`, error.message);
      return {
        ...intervention,
        salarie: null,
      };
    }
  }

  async remove(id: number): Promise<any> {
    const intervention = await this.prisma.intervention.delete({
      where: { id },
      include: {
        projet: true,
        materiel: true,
      },
    });

    // Récupérer les données du salarié via gRPC pour la réponse
    try {
      const salarie = await this.salarieGrpcClient.getSalarie(intervention.salarieId);
      return {
        ...intervention,
        salarie,
      };
    } catch (error) {
      console.error(`Erreur lors de la récupération du salarié ${intervention.salarieId}:`, error.message);
      return {
        ...intervention,
        salarie: null,
      };
    }
  }

  async findBySalarieId(salarieId: number): Promise<any[]> {
    // Vérifier que le salarié existe
    try {
      await this.salarieGrpcClient.getSalarie(salarieId);
    } catch (error) {
      throw new Error(`Salarié avec l'ID ${salarieId} non trouvé`);
    }

    const interventions = await this.prisma.intervention.findMany({
      where: {
        salarieId,
      },
      include: {
        projet: true,
        materiel: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Enrichir avec les données du salarié
    const salarie = await this.salarieGrpcClient.getSalarie(salarieId);
    
    return interventions.map(intervention => ({
      ...intervention,
      salarie,
    }));
  }

  async findByProjetId(projetId: number): Promise<any[]> {
    const interventions = await this.prisma.intervention.findMany({
      where: {
        projetId,
      },
      include: {
        projet: true,
        materiel: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Enrichir chaque intervention avec les données du salarié via gRPC
    const enrichedInterventions = await Promise.all(
      interventions.map(async (intervention) => {
        try {
          const salarie = await this.salarieGrpcClient.getSalarie(intervention.salarieId);
          return {
            ...intervention,
            salarie,
          };
        } catch (error) {
          console.error(`Erreur lors de la récupération du salarié ${intervention.salarieId}:`, error.message);
          return {
            ...intervention,
            salarie: null,
          };
        }
      })
    );

    return enrichedInterventions;
  }
}