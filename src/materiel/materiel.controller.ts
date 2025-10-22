import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MaterielService } from './materiel.service';
import { Materiel } from '@prisma/client';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { UpdateMaterielDto } from './dto/update-materiel.dto';

@Controller('materiels')
export class MaterielController {
  constructor(private readonly materielService: MaterielService) {}

  @Get()
  async findAll(): Promise<Materiel[]> {
    return this.materielService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Materiel | null> {
    return this.materielService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createMaterielDto: CreateMaterielDto): Promise<Materiel> {
    return this.materielService.create(createMaterielDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterielDto: UpdateMaterielDto,
  ): Promise<Materiel> {
    return this.materielService.update(Number(id), updateMaterielDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Materiel> {
    return this.materielService.remove(Number(id));
  }

  @Get('intervention/:interventionId')
  async findByInterventionId(@Param('interventionId') interventionId: string): Promise<Materiel[]> {
    return this.materielService.findByInterventionId(Number(interventionId));
  }
}