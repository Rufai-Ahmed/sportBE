import { Router } from "express";
import { register } from "../controllers/auth";

const router = Router();

// router.post("/login-player", login);
router.post("/register", register);

export default router;
