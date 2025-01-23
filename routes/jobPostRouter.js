const { Router } = require("express");
const jobPostController = require("../controllers/jobPostController");
const JobPost = require("../db/models/jobPosts");
const jobPostRouter = Router();

jobPostRouter.get("/", jobPostController.getAll);
jobPostRouter.get("/filtered", jobPostController.getFiltered);
jobPostRouter.get("/:id", jobPostController.getOne);
jobPostRouter.get("/:id/can-edit", jobPostController.canEdit);
jobPostRouter.post("/", jobPostController.create);
jobPostRouter.put("/:id", jobPostController.update);
jobPostRouter.delete("/:id", jobPostController.deleteJobPost);

jobPostRouter.get("/by-employer/:employerId", jobPostController.getByEmployer);

module.exports = jobPostRouter;
