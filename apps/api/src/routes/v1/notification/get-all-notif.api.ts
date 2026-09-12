import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  c_pagination,
  TB_notification,
  v_pagination,
} from '../../../../../../libs/mx-schema/src';
import { logger } from '../../../shared/logger/logger';
import { count } from 'drizzle-orm';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  ah(async (req, res) => {
    const { limit, offset } = c_pagination({
      limit: req.query.limit,
      page: req.query.page,
    });
    const totalRows = await db.select({ count: count() }).from(TB_notification);
    const notifications = await db.query.TB_notification.findMany({
      limit,
      offset,
    });
    success(res, { rows: notifications, count: totalRows[0].count }, 'success');
  })
);
