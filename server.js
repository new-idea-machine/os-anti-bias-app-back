const express = require("express");
require("dotenv").config();
const getLogger = require("./logger");
const apiRouter = require("./routes/apiRouter");

const { PORT } = process.env;
const logger = getLogger("server");
const app = express();
//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/api", apiRouter);

const server = app.listen(PORT, () => {
  logger.log(`Server is running on port ${PORT}`);
});

module.exports = server;
