const express = require("express");
require("dotenv").config();
const getLogger = require("./logger");
const apiRouter = require("./routes/apiRouter");
const cors = require("cors");

const { PORT } = process.env;
const logger = getLogger("server");
const app = express();
//MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:4200",
    origin: "https://just-talent.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

//ROUTES
app.use("/api", apiRouter);

const server = app.listen(PORT, () => {
  logger.log(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
