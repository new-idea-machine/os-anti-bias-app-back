const { Router } = require("express");
const userRouter = require("./userRouter");

const apiRouter = Router();

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
