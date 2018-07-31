const winston = require('winston');

const level = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
  level: level,
  timestamp: function () {
    return (new Date()).toISOString();
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      )
    }
    ),
  ],
});

module.exports = logger;
