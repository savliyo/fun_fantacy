import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { APP_SETTINGS } from '../app-settings';
const { combine, timestamp, json } = format;

type LevelType = 'error' | 'info';
const logFormat = format.printf((info) => `${info.level}  ${info.message}`);

export const getLogger = (
  folder,
  filename: string,
  level: LevelType = 'info'
) => {
  const dailyRotateTranspot: DailyRotateFile = new DailyRotateFile({
    filename: `logs/${folder}/${filename}-%DATE%.log`,
    maxSize: '20m',
    maxFiles: '7d',
    format: combine(
      timestamp(),
      json(),
      format.metadata({
        fillExcept: ['message', 'level', 'timestamp', 'label'],
      })
    ),
  });

  const logTranspots: any[] = [dailyRotateTranspot];

  if (APP_SETTINGS.IS_DEVELOPMENT) {
    logTranspots.push(
      new transports.Console({
        format: format.combine(format.colorize(), logFormat),
      })
    );
  }

  return createLogger({
    level,
    transports: logTranspots,
  });
};
