import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { TMenu } from './menu.schema';
import { sql } from 'drizzle-orm';
import { z } from 'zod';

export const TB_user = pgTable(
  'user',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    password: text('password').notNull(),
    active: boolean('active').default(true),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
  (adminUser) => ({
    emailIdx: uniqueIndex('emailIdx').on(adminUser.email),
  })
);

export const Z_user_insert = createInsertSchema(TB_user);
export const Z_user = createSelectSchema(TB_user);
export type R_userLogin = { token: string; menu: TMenu[] };
export type TUser = z.infer<typeof Z_user>;
