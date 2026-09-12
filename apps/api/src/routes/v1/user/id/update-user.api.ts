import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_user,
  v_param_id,
  Z_user_insert,
} from '../../../../../../../libs/mx-schema/src';
import { hashPassword } from '../../../../shared/password-hash';

export default Router().post(
  '/update/:id',
  validate({
    body: Z_user_insert.omit({ password: true, id: true }),
    params: v_param_id,
  }),
  ah(async (req, res) => {
    const result = await db
      .update(TB_user)
      .set(req.body)
      .where(eq(TB_user.id, req.params.id))
      .returning();

    success(res, result, 'updated');
  })
);
