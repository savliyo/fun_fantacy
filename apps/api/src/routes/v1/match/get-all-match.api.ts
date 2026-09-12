import { Router } from 'express';
import { TB_match, v_pagination } from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import handler from '../../../shared/async-handler.util';
import { listFiltersToQuery } from '../../../db/utils-db/pg/list-filters/list-filters-middleware';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  listFiltersToQuery(TB_match),
  handler(async (req, res) => {
    const count = await getTotalCount(TB_match);

    const matches = await req.sqlQuery.execute();

    success(res, { rows: matches, count: count }, 'success');
  })
);
