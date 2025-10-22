import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Projet } from '@prisma/client';

@Injectable()
export class ProjetService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Projet[]> {
    return this.prisma.projet.findMany({
      include: {
        client: true,
        interventions: {
          include: {
            salarie: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Projet | null> {
    return this.prisma.projet.findUnique({
      where: { id },
      include: {
        client: true,
        interventions: {
          include: {
            salarie: true,
          },
        },
      },
    });
  }

  async create(data: { nom: string; clientId: number }): Promise<Projet> {
    return this.prisma.projet.create({
      data: {
        nom: data.nom,
        clientId: data.clientId
      },
      include: {
        client: true,
        interventions: {
          include: {
            salarie: true,
          },
        },
      },
    });
  }

  async update(id: number, data: { nom?: string; clientId?: number }): Promise<Projet> {
    const updateData: any = {};
    
    if (data.nom !== undefined) {
      updateData.nom = data.nom;
    }
    
    if (data.clientId !== undefined) {
      updateData.clientId = data.clientId;
    }
    
    return this.prisma.projet.update({
      where: { id },
      data: updateData,
      include: {
        client: true,
        interventions: {
          include: {
            salarie: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Projet> {
    return this.prisma.projet.delete({
      where: { id },
      include: {
        interventions: {
          include: {
            salarie: true,
          },
        },
      },
    });
  }

  async getProjectTimeSummary(projetId: number): Promise<{
    totalTime: number;
    remainingTime: number;
    interventions: any[];
  }> {
    const interventions = await this.prisma.intervention.findMany({
      where: { projetId },
      include: {
        salarie: true,
      },
    });

    const totalTime = interventions.reduce((sum, intervention) => sum + intervention.duree, 0);
    
    // Assuming a standard project duration (you might want to make this configurable)
    const projectDuration = 100; // hours
    const remainingTime = Math.max(0, projectDuration - totalTime);

    return {
      totalTime,
      remainingTime,
      interventions,
    };
  }
}