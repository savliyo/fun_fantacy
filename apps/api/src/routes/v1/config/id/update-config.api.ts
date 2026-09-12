import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_config,
  v_param_id,
  Z_config_insert,
} from '../../../../../../../libs/mx-schema/src';

export default Router().put(
  '/update/:id',
  validate({
    body: Z_config_insert,
    params: v_param_id,
  }),
  ah(async (req, res) => {
    const result = await db
      .update(TB_config)
      .set(req.body)
      .where(eq(TB_config.id, req.params.id))
      .returning();

    success(res, result, 'updated');
  })
);
