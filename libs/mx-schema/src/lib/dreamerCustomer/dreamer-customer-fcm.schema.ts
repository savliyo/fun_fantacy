import { pgTable, text, serial, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { TB_dreamer_customer } from './dreamer-customer.schema';

export const TB_dreamer_customerFcm = pgTable('dreamer_customerFcm', {
  id: serial('id').primaryKey(),
  customerID: integer('customerID')
    .references(() => TB_dreamer_customer.id)
    .notNull(),
  token: text('token').notNull(),
});

export const Z_dreamer_customerFcm_insert = createInsertSchema(TB_dreamer_customerFcm);
export const Z_dreamer_customerFcm = createSelectSchema(TB_dreamer_customerFcm);
