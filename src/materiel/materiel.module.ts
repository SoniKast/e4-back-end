import { Module } from '@nestjs/common';
import { MaterielService } from './materiel.service';
import { MaterielController } from './materiel.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MaterielController],
  providers: [MaterielService, PrismaService],
})
export class MaterielModule {}