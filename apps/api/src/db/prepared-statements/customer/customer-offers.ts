import { and, eq, sql } from 'drizzle-orm';
import { TB_customer } from '../../../../../../libs/mx-schema/src';
import { db } from '../../db';

export const getCustomerWithOffers = db
  .select()
  .from(TB_customer)
  .where(and(eq(TB_customer.deviceID, sql.placeholder('deviceID'))));
