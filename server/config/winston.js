const winston = require('winston');
const WinstonDaily = require('winston-daily-rotate-file');
const morgan = require('morgan');
const process = require('process');
const path = require('path');

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ timestamp: ts, level, message }) => `${ts} ${level}: ${message}`),
);
const logDir = path.resolve(__dirname, '../../logs');
const errorLogDir = path.join(logDir, 'error');

const transports = [
  new WinstonDaily({
    level: 'info',
    maxsize: 1024 * 1024, // 1MB
    dirname: logDir,
    filename: `%DATE%.log`,
    maxFiles: 7,
    format: logFormat,
    datePatten: 'YYYY-MM-DD',
  }),
  new WinstonDaily({
    level: 'error',
    maxsize: 1024 * 1024,
    dirname: errorLogDir,
    filename: `%DATE%.error.log`,
    maxFiles: 30,
    format: logFormat,
    datePatten: 'YYYY-MM-DD-HH',
  }),
];

const logger = winston.createLogger({
  format: logFormat,
  transports,
});

logger.morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize({ all: true }), logFormat),
    }),
  );
}

module.exports = logger;
