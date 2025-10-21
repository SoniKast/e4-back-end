import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SalarieService } from './salarie.service';
import { Salarie } from '@prisma/client';
import { CreateSalarieDto } from './dto/create-salarie.dto';

@Controller('salaries')
export class SalarieController {
  constructor(private readonly salarieService: SalarieService) {}

  @Get()
  async findAll(): Promise<Salarie[]> {
    return this.salarieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Salarie | null> {
    return this.salarieService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createSalarieDto: CreateSalarieDto): Promise<Salarie> {
    return this.salarieService.create(createSalarieDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { nom?: string; prenom?: string },
  ): Promise<Salarie> {
    return this.salarieService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Salarie> {
    return this.salarieService.remove(Number(id));
  }
}