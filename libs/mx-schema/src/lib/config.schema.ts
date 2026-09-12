import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_config = pgTable('config', {
  id: serial('id').primaryKey(),
  adBannerID: text('adBannerID').notNull(),
  adRewardID: text('adRewardID').notNull(),
  privacyPolicy: text('privacyPolicy').notNull(),
  aboutUs: text('aboutUs').notNull(),
  ads: boolean('ads').default(true).notNull(),
  telegramLink: text('telegramLink').notNull(),
  whatsappLink: text('whatsappLink').notNull().default(''),
  youtubeLink: text('youtubeLink').notNull().default(''),
  facebookLink: text('facebookLink').notNull().default(''),
});

export const Z_config = createSelectSchema(TB_config);
export const Z_config_insert = createInsertSchema(TB_config);
export type TConfig = z.infer<typeof Z_config>;
export type TConfigForm = Omit<TConfig, 'id'>;
