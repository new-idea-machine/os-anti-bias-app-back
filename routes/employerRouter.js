const { Router } = require("express");
const employerController = require("../controllers/employerController");
const employerRouter = Router();

employerRouter.get("/", employerController.getAll);
employerRouter.get("/:id", employerController.getOne);
employerRouter.post("/", employerController.create);
employerRouter.put("/:id", employerController.update);
employerRouter.delete("/:id", employerController.deleteEmployer);

module.exports = employerRouter;
