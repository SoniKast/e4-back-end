import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProjetService } from './projet.service';
import { Projet } from '@prisma/client';
import { CreateProjetDto } from './dto/create-projet.dto';

@Controller('projets')
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @Get()
  async findAll(): Promise<Projet[]> {
    return this.projetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Projet | null> {
    return this.projetService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createProjetDto: CreateProjetDto): Promise<Projet> {
    return this.projetService.create(createProjetDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { nom?: string },
  ): Promise<Projet> {
    return this.projetService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Projet> {
    return this.projetService.remove(Number(id));
  }
}