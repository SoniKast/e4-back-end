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
import { SalarieService } from './salarie.service';
import { Salarie } from '@prisma/client';
import { CreateSalarieDto } from './dto/create-salarie.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Salariés')
@ApiBearerAuth()
@Controller('salaries')
export class SalarieController {
  constructor(private readonly salarieService: SalarieService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer tous les salariés' })
  @ApiResponse({ status: 200, description: 'Liste des salariés récupérée' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async findAll(): Promise<Salarie[]> {
    return this.salarieService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  @ApiOperation({ summary: 'Récupérer un salarié par ID' })
  @ApiParam({ name: 'id', description: 'ID du salarié', type: Number })
  @ApiResponse({ status: 200, description: 'Salarié récupéré avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Salarié non trouvé' })
  async findOne(@Param('id') id: string): Promise<Salarie | null> {
    return this.salarieService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Créer un nouveau salarié' })
  @ApiResponse({ status: 201, description: 'Salarié créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  async create(@Body() createSalarieDto: CreateSalarieDto): Promise<Salarie> {
    return this.salarieService.create(createSalarieDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Mettre à jour un salarié' })
  @ApiParam({ name: 'id', description: 'ID du salarié', type: Number })
  @ApiResponse({ status: 200, description: 'Salarié mis à jour avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Salarié non trouvé' })
  async update(
    @Param('id') id: string,
    @Body() data: { nom?: string; prenom?: string },
  ): Promise<Salarie> {
    return this.salarieService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Supprimer un salarié' })
  @ApiParam({ name: 'id', description: 'ID du salarié', type: Number })
  @ApiResponse({ status: 200, description: 'Salarié supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Permissions insuffisantes' })
  @ApiResponse({ status: 404, description: 'Salarié non trouvé' })
  async remove(@Param('id') id: string): Promise<Salarie> {
    return this.salarieService.remove(Number(id));
  }
}