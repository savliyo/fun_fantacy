import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const TB_customer = pgTable('customer', {
  id: serial('id').primaryKey(),
  deviceID: text('deviceID').notNull().unique(),
  device: text('device').default('ios'),
  removeAds: boolean('removeAds').default(false),
});

export const Z_customer_insert = createInsertSchema(TB_customer);
export const Z_customer = createSelectSchema(TB_customer);
