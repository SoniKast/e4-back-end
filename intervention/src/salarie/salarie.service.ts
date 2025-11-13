import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Salarie } from '@prisma/client';

@Injectable()
export class SalarieService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Salarie[]> {
    return this.prisma.salarie.findMany({
      include: {
        interventions: {
          include: {
            projet: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Salarie | null> {
    return this.prisma.salarie.findUnique({
      where: { id },
      include: {
        interventions: {
          include: {
            projet: true,
          },
        },
      },
    });
  }

  async create(data: { nom: string; prenom: string }): Promise<Salarie> {
    return this.prisma.salarie.create({
      data,
      include: {
        interventions: {
          include: {
            projet: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    data: { nom?: string; prenom?: string },
  ): Promise<Salarie> {
    return this.prisma.salarie.update({
      where: { id },
      data,
      include: {
        interventions: {
          include: {
            projet: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Salarie> {
    return this.prisma.salarie.delete({
      where: { id },
      include: {
        interventions: {
          include: {
            projet: true,
          },
        },
      },
    });
  }
}