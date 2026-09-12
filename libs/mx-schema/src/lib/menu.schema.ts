import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_menu = pgTable('menu', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
  link: text('link').notNull(),
  active: boolean('active').default(true),
  parent: integer('parent'),
});

export const Z_menu_insert = createInsertSchema(TB_menu);
export const Z_menu = createSelectSchema(TB_menu);
export type TMenu = z.infer<typeof Z_menu>;
