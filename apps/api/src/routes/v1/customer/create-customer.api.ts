import { Router } from 'express';
import { union } from 'zod';
import {
  TB_customer,
  TB_customerFcm,
  Z_customer_insert,
  Z_customerFcm_insert,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getCustomerWithOffers } from '../../../db/prepared-statements/customer/customer-offers';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { eq } from 'drizzle-orm';

const requestBodyValidation = union([
  Z_customer_insert.pick({ device: true, deviceID: true }),
  Z_customerFcm_insert.pick({ token: true }),
]);

const formatRows = (
  rows: {
    customer: typeof TB_customer.$inferSelect;
  }[]
) => {
  return {
    ...rows[0].customer,
  };
};

export default Router().post(
  '/create',
  validate({
    body: requestBodyValidation,
  }),
  ah(async (req, res) => {
    const [row] = await db
      .select()
      .from(TB_customer)
      .where(eq(TB_customer.deviceID, req.body.deviceID));

    if (row) {
      await db
        .delete(TB_customerFcm)
        .where(eq(TB_customerFcm.customerID, row.id));

      await db.insert(TB_customerFcm).values({
        customerID: row.id,
        token: req.body.token,
      });
      return success(
        res,
        row,
        `Customer exist with device id ${req.body.deviceID}`
      );
    }

    const newCustomer = await db.transaction(async (tx) => {
      //add new customer
      const [customer] = await tx
        .insert(TB_customer)
        .values({ deviceID: req.body.deviceID, device: req.body.device })
        .returning();

      // add fcm token
      await tx
        .insert(TB_customerFcm)
        .values({ token: req.body.token, customerID: customer.id });
      return customer;
    });

    success(res, newCustomer, 'success');
  })
);
