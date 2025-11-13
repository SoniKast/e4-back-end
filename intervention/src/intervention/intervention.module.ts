import { Module } from '@nestjs/common';
import { InterventionService } from './intervention.service';
import { InterventionController } from './intervention.controller';
import { PrismaService } from '../prisma.service';
import { SalarieGrpcClient } from '../grpc-clients/salarie.client';

@Module({
  controllers: [InterventionController],
  providers: [InterventionService, PrismaService, SalarieGrpcClient],
})
export class InterventionModule {}