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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Projets')
@ApiBearerAuth()
@Controller('projets')
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer tous les projets' })
  @ApiResponse({ status: 200, description: 'Liste des projets récupérée' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async findAll(): Promise<Projet[]> {
    return this.projetService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer un projet par ID' })
  @ApiParam({ name: 'id', description: 'ID du projet', type: Number })
  @ApiResponse({ status: 200, description: 'Projet récupéré avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé' })
  async findOne(@Param('id') id: string): Promise<Projet | null> {
    return this.projetService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Créer un nouveau projet' })
  @ApiResponse({ status: 201, description: 'Projet créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async create(@Body() createProjetDto: CreateProjetDto): Promise<Projet> {
    return this.projetService.create(createProjetDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Mettre à jour un projet' })
  @ApiParam({ name: 'id', description: 'ID du projet', type: Number })
  @ApiResponse({ status: 200, description: 'Projet mis à jour avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé' })
  async update(
    @Param('id') id: string,
    @Body() data: { nom?: string },
  ): Promise<Projet> {
    return this.projetService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Supprimer un projet' })
  @ApiParam({ name: 'id', description: 'ID du projet', type: Number })
  @ApiResponse({ status: 200, description: 'Projet supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé' })
  async remove(@Param('id') id: string): Promise<Projet> {
    return this.projetService.remove(Number(id));
  }

  @Get(':id/time-summary')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANagER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer le résumé du temps d\'un projet' })
  @ApiParam({ name: 'id', description: 'ID du projet', type: Number })
  @ApiResponse({ status: 200, description: 'Résumé du temps récupéré avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé' })
  async getTimeSummary(@Param('id') id: string): Promise<{
    totalTime: number;
    remainingTime: number;
    interventions: any[];
  }> {
    return this.projetService.getProjectTimeSummary(Number(id));
  }
}