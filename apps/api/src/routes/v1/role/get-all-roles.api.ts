import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  c_pagination,
  v_pagination,
  TB_role,
} from '../../../../../../libs/mx-schema/src';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  ah(async (req, res) => {
    const { limit, offset } = c_pagination({
      limit: req.query.limit,
      page: req.query.page,
    });

    const count = await getTotalCount(TB_role);

    const rows = await db.query.TB_role.findMany({ limit, offset });
    success(res, { rows, count }, 'success');
  })
);
