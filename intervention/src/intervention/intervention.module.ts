import { Module } from '@nestjs/common';
import { InterventionService } from './intervention.service';
import { InterventionController } from './intervention.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [InterventionController],
  providers: [InterventionService, PrismaService],
})
export class InterventionModule {}