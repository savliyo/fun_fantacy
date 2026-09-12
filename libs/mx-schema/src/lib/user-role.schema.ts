import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_user_role = pgTable('userRole', {
  id: serial('id').primaryKey(),
  roleID: integer('roleID').notNull(),
  userID: integer('userID').notNull(),
});

export const Z_user_role_insert = createInsertSchema(TB_user_role);
export const Z_user_role = createSelectSchema(TB_user_role);
export type TUSerRole = z.infer<typeof Z_user_role>;
