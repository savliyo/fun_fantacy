import { eq } from 'drizzle-orm';
import { Router } from 'express';
import {
  TB_notification,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { db } from '../../../../db/db';
import { success } from '../../../../shared/api-response/response-handler';
import ah from '../../../../shared/async-handler.util';
import { validate } from '../../../../shared/middlewares/validation.middleware';

export default Router().delete(
  '/delete/:id',
  validate({ params: v_param_id }),
  ah(async (req, res) => {
    const result = await db
      .delete(TB_notification)
      .where(eq(TB_notification.id, req.params.id));
    success(res, result, 'Deleted successfully');
  })
);
