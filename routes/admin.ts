import { Router } from "express";
import { adminAuthMiddleware } from "../middleware/admin.middleware";
import { loginAdmin, registerAdmin } from "../controllers/admin";
import { createPlayer } from "../controllers/playerController";
import { updateMatchStatus } from "../controllers/match";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.post("/create-player", createPlayer);
router.put("/update-match", adminAuthMiddleware, updateMatchStatus);
// Add other admin routes as needed

export default router;
