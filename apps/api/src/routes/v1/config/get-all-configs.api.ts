import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { v_pagination, TB_config } from '../../../../../../libs/mx-schema/src';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { listFiltersToQuery } from '../../../db/utils-db/pg/list-filters/list-filters-middleware';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  listFiltersToQuery(TB_config),
  ah(async (req, res) => {
    const count = await getTotalCount(TB_config);
    const rows = await req.sqlQuery.execute();
    success(res, { rows, count }, 'success');
  })
);
