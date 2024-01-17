const { Router } = require("express");
const userRouter = require("./userRouter");
const employerRouter = require("./employerRouter");

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/employers", employerRouter);

module.exports = apiRouter;
