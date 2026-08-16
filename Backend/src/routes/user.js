import express from "express";
import { getUserProfile, signUp, userLogin } from "../controllers/userController.js";
import { authMiddleware } from "../helper/auth.js";
const router = express.Router();

router.post("/sign-up", signUp);

router.post("/login", userLogin);

router.get("/get-profile", authMiddleware, getUserProfile);

export default router;