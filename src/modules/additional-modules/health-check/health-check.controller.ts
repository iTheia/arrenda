import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
@ApiTags('additional')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('/version')
  deployVersion() {
    return this.healthCheckService.deployVersion();
  }
  @Get('health-check')
  helloWorld() {
    return this.healthCheckService.helloWorld();
  }
}
