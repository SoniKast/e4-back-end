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

@Controller('interventions')
export class InterventionController {
  constructor(private readonly interventionService: InterventionService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findAll(): Promise<Intervention[]> {
    return this.interventionService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findOne(@Param('id') id: string): Promise<Intervention | null> {
    return this.interventionService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async create(@Body() createInterventionDto: CreateInterventionDto): Promise<Intervention> {
    return this.interventionService.create(createInterventionDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
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
  async remove(@Param('id') id: string): Promise<Intervention> {
    return this.interventionService.remove(Number(id));
  }

  @Get('salarie/:salarieId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findBySalarieId(@Param('salarieId') salarieId: string): Promise<Intervention[]> {
    return this.interventionService.findBySalarieId(Number(salarieId));
  }

  @Get('projet/:projetId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findByProjetId(@Param('projetId') projetId: string): Promise<Intervention[]> {
    return this.interventionService.findByProjetId(Number(projetId));
  }
}