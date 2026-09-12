import { Worker } from 'bullmq';
// import { queueConnection } from '../queue-connection';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { sendFirebaseNotification } from '../../firebase/notification.fire';

export const firebaseNotificationWorker = new Worker(
  GLOBAL_CONSTANTS.QUEUE_NAMES.firebaseNotification,
  async (job) => {
    try {
      await sendFirebaseNotification(job.data.tokens, { ...job.data.payload });
    } catch (error) {
      throw new Error(error);
    }
  },
  { connection: null, concurrency: 5 }
);
