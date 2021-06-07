import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/ping')
  @ApiOperation({
    summary: "Ping"
  })
  getHello(): string {
    return this.appService.getPong();
  }
}
