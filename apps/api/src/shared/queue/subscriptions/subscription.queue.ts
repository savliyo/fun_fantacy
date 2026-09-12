import { OFFER_PERIOD } from '../../../../../../libs/mx-schema/src';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { BaseQueue } from '../base-queue';
import { subscriptionWorker } from './subscription.worker';
import { add } from 'date-fns';

interface Subscription {
  subscriptionStartDate: Date;
  period: (typeof OFFER_PERIOD)[number];
}

export interface CancelSubscriptionData extends Subscription {
  customerOfferId: number;
}

export interface RemoveAdsSubData extends Subscription {
  customerID: number;
}

export class SubscriptionQueue extends BaseQueue {
  constructor() {
    super(
      GLOBAL_CONSTANTS.QUEUE_NAMES.subscriptionNotification,
      subscriptionWorker
    );
  }

  private addDelay(date: Date, period: Subscription['period']) {
    const newDate = add(date, {
      hours: parseInt(period) * 24,
    });
    return newDate.getTime() - Date.now();
  }

  removeAds(data: RemoveAdsSubData) {
    return this.add(GLOBAL_CONSTANTS.JOB_NAME.REMOVE_ADS, data, {
      delay: this.addDelay(data.subscriptionStartDate, data.period),
    });
  }
}

export const subscriptionQueue = new SubscriptionQueue();
