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

@Controller('materiels')
export class MaterielController {
  constructor(private readonly materielService: MaterielService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findAll(): Promise<Materiel[]> {
    return this.materielService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findOne(@Param('id') id: string): Promise<Materiel | null> {
    return this.materielService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async create(@Body() createMaterielDto: CreateMaterielDto): Promise<Materiel> {
    return this.materielService.create(createMaterielDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async update(
    @Param('id') id: string,
    @Body() updateMaterielDto: UpdateMaterielDto,
  ): Promise<Materiel> {
    return this.materielService.update(Number(id), updateMaterielDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<Materiel> {
    return this.materielService.remove(Number(id));
  }

  @Get('intervention/:interventionId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findByInterventionId(@Param('interventionId') interventionId: string): Promise<Materiel[]> {
    return this.materielService.findByInterventionId(Number(interventionId));
  }
}