import { index, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_rolePermission = pgTable(
  'rolePermission',
  {
    id: serial('id').primaryKey(),
    menuID: integer('menuID').notNull(),
    permissionID: integer('permissionID').notNull(),
    roleID: integer('roleID').notNull(),
  },
  (rolePermission) => ({
    roleIdx: index('roleIdx').on(rolePermission.roleID),
    permissionIdx: index('permissionIdx').on(rolePermission.permissionID),
  })
);

export const Z_rolePermission = createSelectSchema(TB_rolePermission);
export const Z_rolePermission_insert = createInsertSchema(TB_rolePermission);
export type TPermission = z.infer<typeof Z_rolePermission>;
