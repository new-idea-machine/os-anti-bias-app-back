const { Router } = require("express");
const userRouter = require("./userRouter");
const employerRouter = require("./employerRouter");
const jobPostRouter = require("./jobPostRouter");
const resumeRouter = require("./resumeRouter");

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/employers", employerRouter);
apiRouter.use("/jobPosts", jobPostRouter);
apiRouter.use("/resume", resumeRouter);

module.exports = apiRouter;
