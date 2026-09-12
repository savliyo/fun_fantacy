import {
  date,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { TB_match } from '../match/match.schema';
import { TB_customer } from './customer.schema';
import { createSelectSchema } from 'drizzle-zod';
import { datetime } from 'drizzle-orm/mysql-core';

export const TB_premiumMatchUser = pgTable('premiumMatchUser', {
  id: serial('id').primaryKey(),
  customerID: integer('customerID')
    .references(() => TB_customer.id)
    .notNull(),
  matchID: integer('matchID')
    .references(() => TB_match.id),
  paymentID: text('paymentID').notNull(),
  paymentMeta: json('paymentMeta'),
  subsType: text('subsType'),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const Z_premiumMatchUser = createSelectSchema(TB_premiumMatchUser);
