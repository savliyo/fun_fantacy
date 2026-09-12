import { log } from 'console';
import { getLogger } from './base-logger';

const _logger = {
  infoLogger: getLogger('info', 'info'),
  errorLogger: getLogger('error', 'error', 'error'),
  emailLogger: getLogger('emails', 'email'),
  httpLogger: getLogger('requests', 'http'),
};

export const logger = {
  log,
  info: _logger.infoLogger.info.bind(_logger.infoLogger),
  error: _logger.errorLogger.error.bind(_logger.errorLogger),
  email: _logger.emailLogger.info.bind(_logger.emailLogger),
  http: _logger.httpLogger.info.bind(_logger.httpLogger),
};
