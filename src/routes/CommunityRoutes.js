import express from "express";
import validationUserFields from "../middlewares/ValidateUserFields.js";
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router();

// router.post("/community", authMiddleware, Community.createCommunity);

export default router;
