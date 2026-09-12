import { GLOBAL_CONSTANTS } from '../../global-constants';
import { BaseQueue } from '../base-queue';
import { add } from 'date-fns';
import { inactiveMatchWorker } from './inactive-match.worker';

type InactivateMatch = {
  matchID: number;
  startDate: Date;
};

export class InactiveMatchQueue extends BaseQueue {
  constructor() {
    super(GLOBAL_CONSTANTS.QUEUE_NAMES.inactiveMatch, inactiveMatchWorker);
  }

  private addDelay(date: Date) {
    const newDate = add(date, {
      hours: 3,
    });
    return newDate.getTime() - Date.now();
  }

  deactivateMatch(data: InactivateMatch) {
    return this.add(GLOBAL_CONSTANTS.JOB_NAME.DEACTIVATE_MATCH, data, {
      delay: this.addDelay(data.startDate),
    });
  }
}

export const inactiveMatchQueue = new InactiveMatchQueue();
