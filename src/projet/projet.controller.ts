import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjetService } from './projet.service';
import { Projet } from '@prisma/client';
import { CreateProjetDto } from './dto/create-projet.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('projets')
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findAll(): Promise<Projet[]> {
    return this.projetService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findOne(@Param('id') id: string): Promise<Projet | null> {
    return this.projetService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async create(@Body() createProjetDto: CreateProjetDto): Promise<Projet> {
    return this.projetService.create(createProjetDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async update(
    @Param('id') id: string,
    @Body() data: { nom?: string },
  ): Promise<Projet> {
    return this.projetService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<Projet> {
    return this.projetService.remove(Number(id));
  }

  @Get(':id/time-summary')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async getTimeSummary(@Param('id') id: string): Promise<{
    totalTime: number;
    remainingTime: number;
    interventions: any[];
  }> {
    return this.projetService.getProjectTimeSummary(Number(id));
  }
}