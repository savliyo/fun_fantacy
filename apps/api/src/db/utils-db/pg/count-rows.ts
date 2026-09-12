import { count } from 'drizzle-orm';
import { db } from '../../db';

export const getTotalCount = async (schema) => {
  const result = await db.select({ count: count() }).from(schema);
  return result[0].count;
};
