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
import { MaterielService } from './materiel.service';
import { Materiel } from '@prisma/client';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { UpdateMaterielDto } from './dto/update-materiel.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Matériels')
@ApiBearerAuth()
@Controller('materiels')
export class MaterielController {
  constructor(private readonly materielService: MaterielService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer tous les matériels' })
  @ApiResponse({ status: 200, description: 'Liste des matériels récupérée' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async findAll(): Promise<Materiel[]> {
    return this.materielService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer un matériel par ID' })
  @ApiParam({ name: 'id', description: 'ID du matériel', type: Number })
  @ApiResponse({ status: 200, description: 'Matériel récupéré avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Matériel non trouvé' })
  async findOne(@Param('id') id: string): Promise<Materiel | null> {
    return this.materielService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Créer un nouveau matériel' })
  @ApiResponse({ status: 201, description: 'Matériel créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async create(@Body() createMaterielDto: CreateMaterielDto): Promise<Materiel> {
    return this.materielService.create(createMaterielDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Mettre à jour un matériel' })
  @ApiParam({ name: 'id', description: 'ID du matériel', type: Number })
  @ApiResponse({ status: 200, description: 'Matériel mis à jour avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Matériel non trouvé' })
  async update(
    @Param('id') id: string,
    @Body() updateMaterielDto: UpdateMaterielDto,
  ): Promise<Materiel> {
    return this.materielService.update(Number(id), updateMaterielDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Supprimer un matériel' })
  @ApiParam({ name: 'id', description: 'ID du matériel', type: Number })
  @ApiResponse({ status: 200, description: 'Matériel supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Matériel non trouvé' })
  async remove(@Param('id') id: string): Promise<Materiel> {
    return this.materielService.remove(Number(id));
  }

  @Get('intervention/:interventionId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer les matériels par intervention' })
  @ApiParam({ name: 'interventionId', description: 'ID de l\'intervention', type: Number })
  @ApiResponse({ status: 200, description: 'Matériels récupérés avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async findByInterventionId(@Param('interventionId') interventionId: string): Promise<Materiel[]> {
    return this.materielService.findByInterventionId(Number(interventionId));
  }
}