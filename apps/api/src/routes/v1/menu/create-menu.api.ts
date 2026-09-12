import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import handler from '../../../shared/async-handler.util';
import { TB_menu, Z_menu_insert } from '../../../../../../libs/mx-schema/src';
import { validate } from '../../../shared/middlewares/validation.middleware';

export default Router().post(
  '/create',
  validate({ body: Z_menu_insert }),
  handler(async (req, res) => {
    const users = await db.insert(TB_menu).values(req.body);
    success(res, users, 'success');
  })
);
