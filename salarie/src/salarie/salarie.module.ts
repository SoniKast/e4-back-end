import { Module } from '@nestjs/common';
import { SalarieController } from './salarie.controller';
import { SalarieService } from './salarie.service';

@Module({
  controllers: [SalarieController],
  providers: [SalarieService],
  exports: [SalarieService],
})
export class SalarieModule {}