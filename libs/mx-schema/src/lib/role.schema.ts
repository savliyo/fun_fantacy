import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_role = pgTable('role', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  udpatedAt: timestamp('updatedAt').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const Z_role_insert = createInsertSchema(TB_role);
export const Z_role = createSelectSchema(TB_role);
export type TRole = z.infer<typeof Z_role>;
