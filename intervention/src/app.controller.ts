import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Endpoint de test de l\'API' })
  @ApiResponse({ status: 200, description: 'Message de bienvenue' })
  getHello(): string {
    return this.appService.getHello();
  }
}
