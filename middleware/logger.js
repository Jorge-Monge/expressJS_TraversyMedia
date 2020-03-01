const moment = require("moment");

// Middleware function
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()} Hey!`
  );
  next();
};

module.exports = logger;
