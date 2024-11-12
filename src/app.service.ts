import { Injectable, type OnModuleInit } from '@nestjs/common';
import type { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    const job = new CronJob('0 13 * * *', () => {
      this.func();
    });

    this.schedulerRegistry.addCronJob(this.func.name, job); // <<<----- TS Error
    job.start();
  }

  func() {
    console.log('Job is running');
  }
}
