const { Router } = require("express");
const resumeController = require("../controllers/resumeController");
const resumeRouter = Router();

resumeRouter.get("/current-user/", resumeController.getCurrentUserResume);
resumeRouter.get("/by-user/:userId", resumeController.getByUser);
resumeRouter.get("/", resumeController.getAll);
resumeRouter.get("/filtered", resumeController.getFiltered);
resumeRouter.get("/:id", resumeController.getOne);
resumeRouter.post("/", resumeController.create);
resumeRouter.put("/:id", resumeController.update);
resumeRouter.delete("/:id", resumeController.deleteResume);

module.exports = resumeRouter;
