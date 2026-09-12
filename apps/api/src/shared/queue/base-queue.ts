import { JobsOptions, Queue, QueueEvents, Worker } from 'bullmq';
import Redis from 'ioredis';
// import { queueConnection } from './queue-connection';
import { logger } from '../logger/logger';
import { BullAdapter } from '@bull-board/api/bullAdapter';

export const allQueues = [];

export class BaseQueue {
  queue: Queue;
  queueEvents: QueueEvents;
  worker: Worker;

  constructor(name: string, worker: Worker, connection?: Redis) {
    this.queue = new Queue(name, {
      connection: connection ,
    });
    this.queueEvents = new QueueEvents(name);
    this.worker = worker;

    // push all queue for the job board
    allQueues.push(new BullAdapter(this.queue, { allowRetries: false }));

    worker.on('completed', (job) => {
      logger.info(`Job Completed`, {
        id: job.id,
        queue: job.queueName,
        data: job.data,
      });
    });

    worker.on('failed', (job, err) => {
      logger.error(`Job Failed ${err.stack}`, {
        id: job.id,
        queue: job.queueName,
        data: job.data,
      });
    });
  }

  protected async add(name, data, options: JobsOptions = {}) {
    const job = await this.queue.add(name, data, options);
    return { job, queueEvents: this.queueEvents };
  }
}
