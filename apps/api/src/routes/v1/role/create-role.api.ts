import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { db } from '../../../db/db';
import { TB_role, Z_role_insert } from '../../../../../../libs/mx-schema/src';

export default Router().post(
  '/create',
  validate({ body: Z_role_insert }),
  ah(async (req, res) => {

    const result = await db
      .insert(TB_role)
      .values(req.body)
      .returning();

    success(res, result, 'success');
  })
);
