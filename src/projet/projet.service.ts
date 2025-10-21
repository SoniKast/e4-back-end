import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Projet } from '@prisma/client';

@Injectable()
export class ProjetService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Projet[]> {
    return this.prisma.projet.findMany({
      include: {
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
        interventions: {
          include: {
            salarie: true,
          },
        },
      },
    });
  }

  async create(data: { nom: string }): Promise<Projet> {
    return this.prisma.projet.create({
      data,
      include: {
        interventions: {
          include: {
            salarie: true,
          },
        },
      },
    });
  }

  async update(id: number, data: { nom?: string }): Promise<Projet> {
    return this.prisma.projet.update({
      where: { id },
      data,
      include: {
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
}