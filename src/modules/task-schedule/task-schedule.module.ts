import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositoryModule';
import { TaskSchedulerService } from './task-schedule.service';

const imports = [RepositoryModule];
const providers = [TaskSchedulerService];

@Module({
  imports,
  providers,
  exports: providers,
})
export class TaskScheduleModule {}
