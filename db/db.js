const mongoose = require("mongoose");
const getLogger = require("../logger");

const logger = getLogger("db");

const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.log("Connected to MongoDB");
  })
  .catch((error) => logger.error(error.message));

module.exports = mongoose;
