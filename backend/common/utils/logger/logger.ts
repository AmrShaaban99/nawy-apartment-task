import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      if (stack) log += `\nStack: ${stack}`;
      if (Object.keys(meta).length) log += `\nMeta: ${JSON.stringify(meta)}`;
      return log;
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
    }),
    new DailyRotateFile({
      filename: 'logs/warn-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'warn',
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    })
  ],
});

export default logger;
