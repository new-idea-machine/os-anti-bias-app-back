const { Router } = require("express");
const userRouter = require("./userRouter");
const employerRouter = require("./employerRouter");
const jobPostRouter = require("./jobPostRouter");

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/employers", employerRouter);
apiRouter.use("/jobPosts", jobPostRouter);

module.exports = apiRouter;
