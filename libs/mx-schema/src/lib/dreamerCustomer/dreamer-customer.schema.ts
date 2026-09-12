import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const TB_dreamer_customer = pgTable('dreamer_customer', {
  id: serial('id').primaryKey(),
  deviceID: text('deviceID').notNull().unique(),
  device: text('device').default('android'),
  walletAmount: integer('walletAmount').default(5),
});

export const Z_dreamer_customer_insert = createInsertSchema(TB_dreamer_customer);
export const Z_dreamer_customer = createSelectSchema(TB_dreamer_customer);
