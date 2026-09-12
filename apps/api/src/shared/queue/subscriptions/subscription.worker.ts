import { Worker } from 'bullmq';
import { GLOBAL_CONSTANTS } from '../../global-constants';
// import { queueConnection } from '../queue-connection';
import { db } from '../../../db/db';
import {
  TB_customer,
  TB_customer_offer,
} from '../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';

export const subscriptionWorker = new Worker(
  GLOBAL_CONSTANTS.QUEUE_NAMES.subscriptionNotification,
  async (job) => {
    try {
      if (job.name === GLOBAL_CONSTANTS.JOB_NAME.CANCEL_SUBSCRIPTION) {
        await db
          .update(TB_customer_offer)
          .set({ active: false })
          .where(eq(TB_customer_offer.id, job.data.customerOfferId));
      } else if (job.name === GLOBAL_CONSTANTS.JOB_NAME.REMOVE_ADS) {
        await db
          .update(TB_customer)
          .set({ removeAds: false })
          .where(eq(TB_customer.id, job.data.customerID));
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  {
    connection: null,
    concurrency: 5,
    removeOnComplete: { count: 800 },
  }
);
