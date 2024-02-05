const { createLogger, transports, format } = require("winston");
const { formatDate } = require("../utils/utilities");
// Create a logger instance
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: () => formatDate(new Date()) }), // Use current date for timestamp
    format.json()
  ),
  transports: [
    // Log to console
    new transports.Console(),
    // Log errors to a file
    new transports.File({ filename: "error.log", level: "error" }),
    // Log all messages to a file
    new transports.File({ filename: "combined.log" }),
  ],
});

exports.logger = logger;
