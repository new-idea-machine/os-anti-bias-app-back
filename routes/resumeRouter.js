const { Router } = require("express");
const resumeController = require("../controllers/resumeController");
const resumeRouter = Router();

resumeRouter.get("/", resumeController.getAll);
resumeRouter.get("/:id", resumeController.getOne);
resumeRouter.post("/", resumeController.create);
resumeRouter.put("/:id", resumeController.update);
resumeRouter.delete("/:id", resumeController.deleteResume);

resumeRouter.get("/by-user/:userId", resumeController.getByUser);

module.exports = resumeRouter;
