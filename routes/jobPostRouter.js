const { Router } = require("express");
const jobPostController = require("../controllers/jobPostController");
const JobPost = require("../db/models/jobPosts");
const jobPostRouter = Router();

jobPostRouter.get("/", jobPostController.getAll);
jobPostRouter.get("/:id", jobPostController.getOne);
jobPostRouter.post("/", jobPostController.create);
jobPostRouter.put("/:id", jobPostController.update);
jobPostRouter.delete("/:id", jobPostController.deleteJob);

module.exports = jobPostRouter;
