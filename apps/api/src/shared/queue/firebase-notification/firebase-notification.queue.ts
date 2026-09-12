import { BaseQueue } from '../base-queue';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { firebaseNotificationWorker } from './firebase-notification.worker';
import { z } from 'zod';
import { Z_notification_insert } from '../../../../../../libs/mx-schema/src';

class FirebaseNotificationQueue extends BaseQueue {
  constructor() {
    super(
      GLOBAL_CONSTANTS.QUEUE_NAMES.firebaseNotification,
      firebaseNotificationWorker
    );
  }

  sendNotification(
    name: string,
    data: { tokens: string[]; payload: z.infer<typeof Z_notification_insert> }
  ) {
    return this.add(name, data);
  }
}

export const firebaseNotificationQueue = new FirebaseNotificationQueue();
