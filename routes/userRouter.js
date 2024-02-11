const { Router } = require("express");
const userController = require("../controllers/userController");
const User = require("../db/models/users");
const userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getOne);
userRouter.post("/", userController.create);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.deleteUser);

userRouter.post("/login", userController.login);

module.exports = userRouter;
