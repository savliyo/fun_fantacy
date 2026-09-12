import IORedis from 'ioredis';
import { APP_SETTINGS } from '../app-settings';
import { logger } from '../logger/logger';

// export const queueConnection = new IORedis(
//   parseInt(APP_SETTINGS.REDIS_PORT),
//   APP_SETTINGS.REDIS_HOST,
//   {
//     maxRetriesPerRequest: null,
//     lazyConnect: true,
//   }
// );

// queueConnection.on('connect', () => {
//   logger.log(`Redis connected`);
// });
