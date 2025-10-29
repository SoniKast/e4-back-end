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
import { InterventionService } from './intervention.service';
import { Intervention } from '@prisma/client';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Interventions')
@ApiBearerAuth()
@Controller('interventions')
export class InterventionController {
  constructor(private readonly interventionService: InterventionService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer toutes les interventions' })
  @ApiResponse({ status: 200, description: 'Liste des interventions récupérée' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async findAll(): Promise<Intervention[]> {
    return this.interventionService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer une intervention par ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'intervention', type: Number })
  @ApiResponse({ status: 200, description: 'Intervention récupérée avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Intervention non trouvée' })
  async findOne(@Param('id') id: string): Promise<Intervention | null> {
    return this.interventionService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Créer une nouvelle intervention' })
  @ApiResponse({ status: 201, description: 'Intervention créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async create(@Body() createInterventionDto: CreateInterventionDto): Promise<Intervention> {
    return this.interventionService.create(createInterventionDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Mettre à jour une intervention' })
  @ApiParam({ name: 'id', description: 'ID de l\'intervention', type: Number })
  @ApiResponse({ status: 200, description: 'Intervention mise à jour avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Intervention non trouvée' })
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Supprimer une intervention' })
  @ApiParam({ name: 'id', description: 'ID de l\'intervention', type: Number })
  @ApiResponse({ status: 200, description: 'Intervention supprimée avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Intervention non trouvée' })
  async remove(@Param('id') id: string): Promise<Intervention> {
    return this.interventionService.remove(Number(id));
  }

  @Get('salarie/:salarieId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer les interventions par salarié' })
  @ApiParam({ name: 'salarieId', description: 'ID du salarié', type: Number })
  @ApiResponse({ status: 200, description: 'Interventions récupérées avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async findBySalarieId(@Param('salarieId') salarieId: string): Promise<Intervention[]> {
    return this.interventionService.findBySalarieId(Number(salarieId));
  }

  @Get('projet/:projetId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer les interventions par projet' })
  @ApiParam({ name: 'projetId', description: 'ID du projet', type: Number })
  @ApiResponse({ status: 200, description: 'Interventions récupérées avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async findByProjetId(@Param('projetId') projetId: string): Promise<Intervention[]> {
    return this.interventionService.findByProjetId(Number(projetId));
  }
}