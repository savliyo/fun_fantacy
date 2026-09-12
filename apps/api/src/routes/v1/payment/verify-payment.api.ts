import { and, eq } from 'drizzle-orm';
import { Router } from 'express';
import {
  TB_customer,
  TB_premiumMatchUser,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { other, success } from '../../../shared/api-response/response-handler';
import { APP_SETTINGS } from '../../../shared/app-settings';
import ah from '../../../shared/async-handler.util';
import { subscriptionQueue } from '../../../shared/queue/subscriptions/subscription.queue';

export default Router().post(
  '/verify-payment',
  ah(async (req, res) => {
    const { matchID, customer, removeAds, purchase, subsType } = req.body;

    if (removeAds) {
      await db
        .update(TB_customer)
        .set({ removeAds: true })
        .where(eq(TB_customer.id, customer.id));
      // await subscriptionQueue.removeAds({
      //   customerID: customer.id,
      //   period: '30',
      //   subscriptionStartDate: new Date(),
      // });
    } else if (subsType == '7_days') {
      const currentDate = new Date()

      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 7);
      const [result]: any = await db.select().from(TB_premiumMatchUser).where(
        and(
          eq(TB_premiumMatchUser.customerID, customer.id),
          eq(TB_premiumMatchUser.subsType, '7_days')
        )
      )
      if (result) {
        const obj = {
          paymentID: purchase.transactionId,
          paymentMeta: purchase,
          startDate: currentDate,
          endDate: endDate,
        }
        await db
          .update(TB_premiumMatchUser)
          .set(obj)
          .where(and(
            eq(TB_premiumMatchUser.customerID, customer.id),
            eq(TB_premiumMatchUser.subsType, '7_days')
          ));
      } else {
        await db.insert(TB_premiumMatchUser).values({
          customerID: customer.id,
          paymentID: purchase.transactionId,
          paymentMeta: purchase,
          subsType: subsType,
          startDate: currentDate,
          endDate: endDate,
          createdAt: currentDate
        });
      }


    } else if (subsType == '30_days') {
      const currentDate = new Date()

      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30);
      const [result]: any = await db.select().from(TB_premiumMatchUser).where(
        and(
          eq(TB_premiumMatchUser.customerID, customer.id),
          eq(TB_premiumMatchUser.subsType, '30_days')
        )
      )
      if (result) {
        const obj = {
          paymentID: purchase.transactionId,
          paymentMeta: purchase,
          startDate: currentDate,
          endDate: endDate,
        }
        await db
          .update(TB_premiumMatchUser)
          .set(obj)
          .where(and(
            eq(TB_premiumMatchUser.customerID, customer.id),
            eq(TB_premiumMatchUser.subsType, '7_days')
          ));
      } else {
        await db.insert(TB_premiumMatchUser).values({
          customerID: customer.id,
          paymentID: purchase.transactionId,
          paymentMeta: purchase,
          subsType: subsType,
          startDate: currentDate,
          endDate: endDate,
          createdAt: currentDate
        });
      }
    } else {
      await db.insert(TB_premiumMatchUser).values({
        customerID: customer.id,
        paymentID: purchase.transactionId,
        matchID,
        paymentMeta: purchase,
      });
    }
    success(res, null, 'Payment Verified');
  })
);
