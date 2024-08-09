import { Router } from "express";
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  startSession,
  endSession,
  getCurrentSession,
} from "../controllers/session";
import { adminAuthMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.post("/sessions", createSession);
router.get("/sessions", getSessions);
router.get("/sessions/:id", getSessionById);
router.put("/sessions/:id", updateSession);
router.delete("/sessions/:id", deleteSession);
router.post("/sessions/:id/start", startSession);
router.post("/sessions/:id/end", endSession);
router.get("/sessions/current", getCurrentSession);

export default router;
