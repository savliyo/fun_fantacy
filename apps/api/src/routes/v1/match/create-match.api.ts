import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { MatchImageUpload, transformMatchBody } from './match.utils.api';
import { db } from '../../../db/db';
import { TB_match } from '../../../../../../libs/mx-schema/src';
import { inactiveMatchQueue } from '../../../shared/queue/inactive-match/inactive-match.queue';

export default Router().post('/create', MatchImageUpload, async (req, res) => {
  const results = await db
    .insert(TB_match)
    .values({
      ...transformMatchBody(req.body),
      teamOneLogo: req.files?.['teamOneLogo'][0]?.filename || '',
      teamTwoLogo: req.files?.['teamTwoLogo'][0]?.filename || '',
      h2hTeamImage: req.files?.['h2hTeamImage'][0]?.filename || '',
      premiumTeamImage: req.files?.['premiumTeamImage'][0]?.filename || '',
      glImage: req.files?.['glImage'][0]?.filename,
    })
    .returning();
  // await inactiveMatchQueue.deactivateMatch({
  //   startDate: new Date(`${req.body.startDate} ${req.body.startTime}`),
  //   matchID: results[0].id,
  // });
  success(res, results, 'success');
});
