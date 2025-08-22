import express from "express";
import UserController from "../usuario/UserController.js";
import validationUserFields from "../middlewares/validateUserFields.js";

const router = express.Router();

router.post("/user", validationUserFields, UserController.createUser);

export default router;
