import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterventionModule } from './intervention/intervention.module';
import { ProjetModule } from './projet/projet.module';
import { SalarieModule } from './salarie/salarie.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [InterventionModule, ProjetModule, SalarieModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
