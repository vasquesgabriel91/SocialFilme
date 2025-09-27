import express from "express";
import UserController from "../usuario/UserController.js";
import validationUserFields from "../middlewares/ValidateUserFields.js";
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/user", validationUserFields([ "username", "email", "password" ]), UserController.createUser);
router.get("/user/:id", authMiddleware, UserController.getUserById);
router.put("/update/:id",authMiddleware, UserController.updateUser);
router.post("/follow/:username",authMiddleware, UserController.followUser);


export default router;
