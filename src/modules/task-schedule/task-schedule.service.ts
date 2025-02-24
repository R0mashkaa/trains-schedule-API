import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getConfig } from '@app/config';

@Injectable()
export class TaskSchedulerService {
  constructor() {}

  @Cron(CronExpression.EVERY_MINUTE)
  async wakeUpRender() {
    Logger.log('CRON START wakeUpRender');

    await fetch(`${getConfig().base_url}/health`);

    Logger.log('CRON FINISH wakeUpRender');
  }
}
