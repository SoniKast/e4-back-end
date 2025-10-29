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

@Controller('salaries')
export class SalarieController {
  constructor(private readonly salarieService: SalarieService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findAll(): Promise<Salarie[]> {
    return this.salarieService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'TECHNICIAN')
  async findOne(@Param('id') id: string): Promise<Salarie | null> {
    return this.salarieService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async create(@Body() createSalarieDto: CreateSalarieDto): Promise<Salarie> {
    return this.salarieService.create(createSalarieDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async update(
    @Param('id') id: string,
    @Body() data: { nom?: string; prenom?: string },
  ): Promise<Salarie> {
    return this.salarieService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<Salarie> {
    return this.salarieService.remove(Number(id));
  }
}