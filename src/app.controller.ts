import { Controller, Get } from '@nestjs/common';
import { Public } from '@app/common';

@Controller()
export class AppController {
  @Public()
  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}
