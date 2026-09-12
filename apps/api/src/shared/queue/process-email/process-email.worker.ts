import { Worker } from 'bullmq';
// import { queueConnection } from '../queue-connection';
import { sendEmail } from '../../mail-service';
import { GLOBAL_CONSTANTS } from '../../global-constants';

export const emailWorker = new Worker(
  GLOBAL_CONSTANTS.QUEUE_NAMES.processEmail,
  async (job) => {
    try {
      await sendEmail(job.data);
    } catch (error) {
      throw new Error(error);
    }
  },
  { connection: null, concurrency: 5 }
);
