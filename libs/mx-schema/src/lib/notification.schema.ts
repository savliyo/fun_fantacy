import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_notification = pgTable('notifications', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  image: text('imageUrl'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  udpatedAt: timestamp('updatedAt').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const Z_notification_insert = createInsertSchema(TB_notification);
export const Z_notification = createSelectSchema(TB_notification);
export type TNotification = z.infer<typeof Z_notification>;
