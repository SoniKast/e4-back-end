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
      },
    });
  }

  async findOne(id: number): Promise<Intervention | null> {
    return this.prisma.intervention.findUnique({
      where: { id },
      include: {
        projet: true,
        salarie: true,
      },
    });
  }

  async create(data: {
    date: Date;
    duree: number;
    projetId: number;
    salarieId: number;
  }): Promise<Intervention> {
    return this.prisma.intervention.create({
      data,
      include: {
        projet: true,
        salarie: true,
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
      },
    });
  }

  async remove(id: number): Promise<Intervention> {
    return this.prisma.intervention.delete({
      where: { id },
      include: {
        projet: true,
        salarie: true,
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
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}