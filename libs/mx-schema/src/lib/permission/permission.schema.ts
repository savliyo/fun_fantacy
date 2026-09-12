import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_permission = pgTable('permission', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const Z_permission = createSelectSchema(TB_permission);
export const Z_permission_insert = createInsertSchema(TB_permission);
export type TPermission = z.infer<typeof Z_permission>;
