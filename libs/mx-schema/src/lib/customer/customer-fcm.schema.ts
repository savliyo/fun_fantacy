import { pgTable, text, serial, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { TB_customer } from './customer.schema';

export const TB_customerFcm = pgTable('customerFcm', {
  id: serial('id').primaryKey(),
  customerID: integer('customerID')
    .references(() => TB_customer.id)
    .notNull(),
  token: text('token').notNull(),
});

export const Z_customerFcm_insert = createInsertSchema(TB_customerFcm);
export const Z_customerFcm = createSelectSchema(TB_customerFcm);
