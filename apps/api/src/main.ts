import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });
import http from 'http';
import app from './express-app';
import { APP_SETTINGS } from './shared/app-settings';
import chalk from 'chalk';
import { logger } from './shared/logger/logger';
import { checkDbConnection } from './db/db';
import { socketManager } from './shared/socket';

async function main() {
  const server = http.createServer(app);
  checkDbConnection();
  socketManager.initialize(server);

  server.listen(APP_SETTINGS.PORT, () => {
    const { IS_DEVELOPMENT, NODE_ENV, PORT } = APP_SETTINGS;
    const msg = `${NODE_ENV.toUpperCase()} server started at port ${PORT}`;
    logger.log(IS_DEVELOPMENT ? chalk.cyanBright(msg) : chalk.redBright(msg));
  });
}
main();
