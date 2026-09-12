import { logger } from './logger';
import morgan from 'morgan';

const morganFormat = ':method :url :status - :response-time ms'; // Customize format
const stream = {
  // Use the http severity
  write: (message: string) => {
    const [method, url, status, _, responseTimeInMs] = message.split(' ');
    const msg = `${method} ${url} ${status} - ${responseTimeInMs} ms`;
    if (parseInt(responseTimeInMs) > 100) {
      logger.http(`${msg}`, { critical: true });
    }
    logger.http(msg);
  },
};

export const logHttpRequests = morgan(morganFormat, { stream });
