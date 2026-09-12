import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const OFFER_PERIOD = ['1', '15', '30'] as const;

export const periodEnum = pgEnum('period', OFFER_PERIOD);

export const TB_offer = pgTable('offer', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  fakeAmount: integer('fakeAmount').notNull(),
  period: periodEnum('period').default(OFFER_PERIOD[0]),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

const modifiers = {
  fakeAmount: z.coerce.number(),
  amount: z.coerce.number(),
};

export const Z_offer = createSelectSchema(TB_offer, modifiers);
export const Z_offer_insert = createInsertSchema(TB_offer, modifiers);
export type TOffer = z.infer<typeof Z_offer>;
