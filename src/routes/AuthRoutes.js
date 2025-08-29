import express from "express";
import ValidateUserFields from "../middlewares/ValidateUserFields.js";
import AuthController from "../auth/AuthController.js";
const router = express.Router();

router.post("/login", ValidateUserFields([ "username", "password" ]),AuthController.authenticate);

export default router;
