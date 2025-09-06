import express from "express";
import Community from "../communities/CommunitiesController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/community", authMiddleware, Community.createCommunity);

export default router;
