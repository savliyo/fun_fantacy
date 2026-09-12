import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const GAME_SLUG = [
  'cricket',
  'football',
  'basketball',
  'kabaddi',
] as const;

export const MATCH_STATUS = [
  'completed',
  'in-progress',
  'waiting',
  'done',
] as const;

export const statusEnum = pgEnum('status', MATCH_STATUS);
export const gameSlugEnum = pgEnum('gameSlug', GAME_SLUG);

export const TB_match = pgTable(
  'match',
  {
    id: serial('id').primaryKey(),
    gameSlug: text('gameSlug').default('cricket'),
    teamOne: text('teamOne').notNull(),
    teamOneLogo: text('teamOneLogo').notNull(),
    teamTwo: text('teamTwo').notNull(),
    teamTwoLogo: text('teamTwoLogo').notNull(),
    teamTwoSlug: text('teamTwoSlug').notNull(),
    teamOneSlug: text('teamOneSlug').notNull(),
    teamOnePlayers: text('teamOnePlayers').notNull(),
    teamTwoPlayers: text('teamTwoPlayers').notNull(),
    venue: text('venue').notNull(),
    league: text('league').notNull(),
    h2hTeam: text('h2hTeam').notNull(),
    h2hTeamImage: text('h2hTeamImage').notNull(),
    premiumTeamImage: text('premiumTeamImage').notNull(),
    glImage: text('glImage').notNull(),
    startDate: text('startDate').notNull(),
    startTime: text('startTime').notNull(),
    description: text('description').notNull(),
    format: text('format').notNull(),
    status: statusEnum('status').default('waiting'),
    active: boolean('active').default(true),
    premiumTeamPrice: integer('premiumTeamPrice').notNull(),
  },
  (match) => ({
    gameSlugIdx: index('gameSlugIdx').on(match.gameSlug),
  })
);

export const Z_match_insert = createInsertSchema(TB_match);
export const Z_match = createSelectSchema(TB_match);
export type TMatch = z.infer<typeof Z_match>;
export type FormType = Omit<
  TMatch,
  'id' | 'teamTwoSlug' | 'teamOneSlug' | 'active'
>;
