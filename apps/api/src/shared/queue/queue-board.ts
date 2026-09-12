import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { allQueues } from './base-queue';

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: allQueues,
  serverAdapter: serverAdapter,
  options: {
    uiConfig: {
      boardTitle: 'MX Api Queue',
    },
  },
});
