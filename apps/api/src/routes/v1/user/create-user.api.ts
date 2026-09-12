import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { db } from '../../../db/db';
import { TB_user, Z_user_insert } from '../../../../../../libs/mx-schema/src';
import { hashPassword } from '../../../shared/password-hash';

export default Router().post(
  '/create',
  validate({ body: Z_user_insert.omit({ active: true, id: true }) }),
  ah(async (req, res) => {
    const result = await db
      .insert(TB_user)
      .values({
        ...req.body,
        active: true,
        password: hashPassword(req.body.password),
      })
      .returning();
    success(res, result, 'success');
  })
);
