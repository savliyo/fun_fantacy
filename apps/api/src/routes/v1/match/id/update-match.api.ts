import { Router } from 'express';
import { db } from '../../../../db/db';
import { success } from '../../../../shared/api-response/response-handler';
import { safeParse } from '../../../../../../../libs/helpers/src';
import { MatchImageUpload, transformMatchBody } from '../match.utils.api';
import { TB_match, v_param_id } from '../../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';

export default Router().put(
  '/:id',
  validate({ params: v_param_id }),
  MatchImageUpload,
  async (req, res) => {
    const previousFileNames = safeParse(req.body.previousFiles);
    const body = {
      ...transformMatchBody(req.body),
      teamOneLogo:
        req.files?.['teamOneLogo']?.[0]?.filename ||
        previousFileNames.teamOneLogo,
      teamTwoLogo:
        req.files?.['teamTwoLogo']?.[0]?.filename ||
        previousFileNames.teamTwoLogo,
      h2hTeamImage:
        req.files?.['h2hTeamImage']?.[0]?.filename ||
        previousFileNames.h2hTeamImage,
      premiumTeamImage:
        req.files?.['premiumTeamImage']?.[0]?.filename ||
        previousFileNames.premiumTeamImage,
      glImage:
        req.files?.['glImage']?.[0]?.filename || previousFileNames.glImage,
    };

    const result = await db
      .update(TB_match)
      .set(body)
      .where(eq(TB_match.id, parseInt(req.params.id)));
    success(res, result, 'success');
  }
);
