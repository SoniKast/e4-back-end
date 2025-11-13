import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterventionModule } from './intervention/intervention.module';
import { ProjetModule } from './projet/projet.module';
import { ClientModule } from './client/client.module';
import { MaterielModule } from './materiel/materiel.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SalarieGrpcClient } from './grpc-clients/salarie.client';

@Module({
  imports: [InterventionModule, ProjetModule, ClientModule, MaterielModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SalarieGrpcClient],
  exports: [SalarieGrpcClient],
})
export class AppModule {}
