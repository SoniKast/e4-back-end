import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany({
      include: {
        projet: true,
      },
    });
  }

  async findOne(id: number): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        projet: true,
      },
    });
  }

  async create(data: { nom: string; adresse: string }): Promise<Client> {
    return this.prisma.client.create({
      data,
      include: {
        projet: true,
      },
    });
  }

  async update(id: number, data: { nom?: string; adresse?: string }): Promise<Client> {
    return this.prisma.client.update({
      where: { id },
      data,
      include: {
        projet: true,
      },
    });
  }

  async remove(id: number): Promise<Client> {
    return this.prisma.client.delete({
      where: { id },
      include: {
        projet: true,
      },
    });
  }
}