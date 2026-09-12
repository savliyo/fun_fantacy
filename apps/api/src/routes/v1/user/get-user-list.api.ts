import { Router } from 'express';
import { TB_user, v_pagination } from '../../../../../../libs/mx-schema/src';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { listFiltersToQuery } from '../../../db/utils-db/pg/list-filters/list-filters-middleware';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { validate } from '../../../shared/middlewares/validation.middleware';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  listFiltersToQuery(TB_user),
  ah(async (req, res) => {
    const count = await getTotalCount(TB_user);
    const rows = await req.sqlQuery.execute();
    success(res, { rows: rows, count }, 'success');
  })
);
