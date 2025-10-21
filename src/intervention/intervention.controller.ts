import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { InterventionService } from './intervention.service';
import { Intervention } from '@prisma/client';

@Controller('interventions')
export class InterventionController {
  constructor(private readonly interventionService: InterventionService) {}

  @Get()
  async findAll(): Promise<Intervention[]> {
    return this.interventionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Intervention | null> {
    return this.interventionService.findOne(Number(id));
  }

  @Post()
  async create(
    @Body()
    data: {
      date: Date;
      duree: number;
      projetId: number;
      salarieId: number;
    },
  ): Promise<Intervention> {
    return this.interventionService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      date?: Date;
      duree?: number;
      projetId?: number;
      salarieId?: number;
    },
  ): Promise<Intervention> {
    return this.interventionService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Intervention> {
    return this.interventionService.remove(Number(id));
  }
}