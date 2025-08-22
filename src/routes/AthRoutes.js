import express from "express";
import AuthController from "../auth/AuthController";

const router = express.Router();

router.post("/login", AuthController.authenticate);

export default router;
