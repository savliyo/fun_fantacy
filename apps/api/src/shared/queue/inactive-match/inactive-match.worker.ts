import { Worker } from 'bullmq';
// import { queueConnection } from '../queue-connection';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { db } from '../../../db/db';
import { TB_match } from '../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';

export const inactiveMatchWorker = new Worker(
  GLOBAL_CONSTANTS.QUEUE_NAMES.inactiveMatch,
  async (job) => {
    try {
      await db
        .update(TB_match)
        .set({ active: false })
        .where(eq(TB_match.id, job.data.matchID));
    } catch (error) {
      throw new Error(error);
    }
  },
  { connection: null, concurrency: 3 }
);
