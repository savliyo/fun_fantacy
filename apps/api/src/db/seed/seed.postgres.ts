import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import { Pool } from 'pg';
import {
  TB_config,
  TB_customer,
  TB_customer_offer,
  TB_customerFcm,
  TB_match,
  TB_menu,
  TB_notification,
  TB_offer,
  TB_role,
  TB_user,
} from '../../../../../libs/mx-schema/src';
import { seedMenu } from './menu';
import { hashPassword } from '../../shared/password-hash';
import { eq } from 'drizzle-orm';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

async function seed() {
  const db = drizzle(pool, {
    logger: true,
    schema: {
      TB_user,
      TB_customer,
      TB_customerFcm,
      TB_menu,
      TB_match,
      TB_notification,
      TB_role,
      TB_offer,
      TB_customer_offer,
      TB_config,
    },
  });

  await db.delete(TB_menu);
  await db.insert(TB_menu).values(seedMenu);

  await db.delete(TB_user).where(eq(TB_user.email, 'test@test.com'));
  await db
    .insert(TB_user)
    .values([{ email: 'test@test.com', password: hashPassword('123') }]);

  process.exit(0);
}

seed();
