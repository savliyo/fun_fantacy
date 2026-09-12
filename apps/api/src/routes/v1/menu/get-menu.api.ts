import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import handler from '../../../shared/async-handler.util';

export default Router().get(
  '/all',
  handler(async (_, res) => {
    const users = await db.query.TB_menu.findMany();
    success(res, users, 'success');
  })
);
