import { eq } from 'drizzle-orm';
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  TB_match,
  TB_premiumMatchUser,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { db } from '../../../../db/db';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';

export default Router().delete(
  '/:id',
  validate({ params: v_param_id }),
  expressAsyncHandler(async (req, res) => {
    db.transaction(async (tx) => {
      await tx
        .delete(TB_premiumMatchUser)
        .where(eq(TB_premiumMatchUser.matchID, req.params.id));
      const results = await tx
        .delete(TB_match)
        .where(eq(TB_match.id, req.params.id));
      success(res, results, 'success');
    });
  })
);
