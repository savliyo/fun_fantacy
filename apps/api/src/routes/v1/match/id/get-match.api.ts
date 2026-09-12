import { and, eq, isNotNull, ne, or } from 'drizzle-orm';
import { Router } from 'express';
import {
  TB_match,
  TB_premiumMatchUser,
} from '../../../../../../../libs/mx-schema/src';
import { db } from '../../../../db/db';
import { success } from '../../../../shared/api-response/response-handler';

export default Router().get('/detail/:id', async (req, res) => {

  if (!req.params?.id) {
    success(res, null, 'success');
    return

  }
  const query = db.select().from(TB_match).$dynamic();
  console.log(req.query.customerID, 'req.query.customerID')

  if (req.query.customerID && req.query.customerID != 'null' && req.query.customerID != undefined && req.query.customerID != "undefined") {
    query.leftJoin(
      TB_premiumMatchUser,
      and(
        eq(
          TB_premiumMatchUser.customerID,
          Number(req.query.customerID)
        ),
        or(
          isNotNull(TB_premiumMatchUser.subsType),
          eq(TB_match.id, TB_premiumMatchUser.matchID),
        )
      )
    );
  }
console.log(query, 'query')
  const [result]: any = await query.where(
    eq(TB_match.id, parseInt(req.params.id))
  );
  let response = result;
  if (result?.match) {
    if (result.premiumMatchUser && result.premiumMatchUser?.subsType) {
      const endDate = new Date(result.premiumMatchUser.endDate);
      const currentDate = new Date();
      if (endDate < currentDate) {
        await db.delete(TB_premiumMatchUser).where(
          eq(TB_premiumMatchUser.customerID, parseInt(req.query.customerID as string)
          )
        )
        response = { ...result.match };
      } else {

        response = { ...result.match, premiumMatchUser: result.premiumMatchUser };
      }
    } else {
      response = { ...result.match, premiumMatchUser: result.premiumMatchUser };

    }
  }
  // console.log(response)

  success(res, response, 'success');
});
