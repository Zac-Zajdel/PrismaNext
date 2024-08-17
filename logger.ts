import winston, { createLogger, transports } from 'winston';
const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp, ...meta }) => {
  const processedMeta = Object.fromEntries(
    Object.entries(meta).map(([key, value]) => [
      key,
      value === undefined ? '<<UNDEFINED>>' : value,
    ]),
  );

  const metaString = Object.keys(processedMeta).length
    ? `,\n  "data": ${JSON.stringify(processedMeta, null, 2).replace(/\n/g, '\n  ')}`
    : '';

  return `{
  "timestamp": "${timestamp}",
  "level": "${level.toUpperCase()}",
  "message": "${message}"${metaString}
}`;
});

const logger = createLogger({
  level: 'info',
  silent: process.env.NODE_ENV === 'production',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
  transports: new transports.File({
    filename: 'app.log',
  }),
});

export { logger };
