import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalarieModule } from './salarie/salarie.module';

@Module({
  imports: [SalarieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
