import { Module } from '@nestjs/common';
import { SalarieService } from './salarie.service';
import { SalarieController } from './salarie.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SalarieController],
  providers: [SalarieService, PrismaService],
})
export class SalarieModule {}