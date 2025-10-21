import { Module } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { ProjetController } from './projet.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProjetController],
  providers: [ProjetService, PrismaService],
})
export class ProjetModule {}