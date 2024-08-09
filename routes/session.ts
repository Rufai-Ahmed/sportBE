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
  addTeamToSession,
  removeTeamFromSession,
} from "../controllers/session";
import { adminAuthMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Session Routes
router.post("/sessions", createSession);
router.get("/sessions", getSessions);
router.get("/sessions/:id", getSessionById);
router.put("/sessions/:id", updateSession);
router.delete("/sessions/:id", deleteSession);
router.post("/sessions/:id/start", startSession);
router.post("/sessions/:id/end", endSession);
router.get("/sessions/current", getCurrentSession);

// Team Management Routes
router.post("/sessions/:id/teams", addTeamToSession); // Add a team to a session
router.delete("/sessions/:id/teams/:teamId", removeTeamFromSession); // Remove a team from a session

export default router;
