const { Router } = require("express");
const employerController = require("../controllers/employerController");
const employerRouter = Router();

employerRouter.get("/search", employerController.getByEmployerName);
employerRouter.get(
  "/current-user/",
  employerController.getCurrentUserEmployerInfo
);
employerRouter.get("/", employerController.getAll);
employerRouter.get("/:id/auth", employerController.userAuth);
employerRouter.get("/:id", employerController.getOne);
employerRouter.post("/", employerController.create);
employerRouter.put("/:id", employerController.update);
employerRouter.delete("/:id", employerController.deleteEmployer);

module.exports = employerRouter;
