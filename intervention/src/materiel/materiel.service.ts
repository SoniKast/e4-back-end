import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Materiel } from '@prisma/client';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { UpdateMaterielDto } from './dto/update-materiel.dto';

@Injectable()
export class MaterielService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Materiel[]> {
    return this.prisma.materiel.findMany({
      include: {
        interventions: true,
      },
    });
  }

  async findOne(id: number): Promise<Materiel | null> {
    return this.prisma.materiel.findUnique({
      where: { id },
      include: {
        interventions: true,
      },
    });
  }

  async create(createMaterielDto: CreateMaterielDto): Promise<Materiel> {
    return this.prisma.materiel.create({
      data: createMaterielDto,
      include: {
        interventions: true,
      },
    });
  }

  async update(id: number, updateMaterielDto: UpdateMaterielDto): Promise<Materiel> {
    return this.prisma.materiel.update({
      where: { id },
      data: updateMaterielDto,
      include: {
        interventions: true,
      },
    });
  }

  async remove(id: number): Promise<Materiel> {
    return this.prisma.materiel.delete({
      where: { id },
      include: {
        interventions: true,
      },
    });
  }

  async findByInterventionId(interventionId: number): Promise<Materiel[]> {
    return this.prisma.materiel.findMany({
      where: {
        interventions: {
          some: {
            id: interventionId
          }
        },
      },
      include: {
        interventions: true,
      },
    });
  }
}