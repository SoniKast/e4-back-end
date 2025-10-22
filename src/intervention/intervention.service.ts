import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Intervention } from '@prisma/client';

@Injectable()
export class InterventionService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Intervention[]> {
    return this.prisma.intervention.findMany({
      include: {
        projet: true,
        salarie: true,
        materiels: true,
      },
    });
  }

  async findOne(id: number): Promise<Intervention | null> {
    return this.prisma.intervention.findUnique({
      where: { id },
      include: {
        projet: true,
        salarie: true,
        materiels: true,
      },
    });
  }

  async create(data: {
    date: Date;
    duree: number;
    projetId: number;
    salarieId: number;
    materiels?: { designation: string }[];
  }): Promise<Intervention> {
    return this.prisma.intervention.create({
      data: {
        date: data.date,
        duree: data.duree,
        projetId: data.projetId,
        salarieId: data.salarieId,
        materiels: data.materiels ? {
          create: data.materiels.map(materiel => ({
            designation: materiel.designation,
          }))
        } : undefined,
      },
      include: {
        projet: true,
        salarie: true,
        materiels: true,
      },
    });
  }

  async update(
    id: number,
    data: {
      date?: Date;
      duree?: number;
      projetId?: number;
      salarieId?: number;
    },
  ): Promise<Intervention> {
    return this.prisma.intervention.update({
      where: { id },
      data,
      include: {
        projet: true,
        salarie: true,
        materiels: true,
      },
    });
  }

  async remove(id: number): Promise<Intervention> {
    return this.prisma.intervention.delete({
      where: { id },
      include: {
        projet: true,
        salarie: true,
        materiels: true,
      },
    });
  }

  async findBySalarieId(salarieId: number): Promise<Intervention[]> {
    return this.prisma.intervention.findMany({
      where: {
        salarieId,
      },
      include: {
        projet: true,
        salarie: true,
        materiels: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findByProjetId(projetId: number): Promise<Intervention[]> {
    return this.prisma.intervention.findMany({
      where: {
        projetId,
      },
      include: {
        salarie: true,
        projet: true,
        materiels: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}