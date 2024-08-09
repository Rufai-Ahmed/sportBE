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

const router = Router();

// Route to create a new session
router.post("/sessions", createSession);

// Route to get all sessions
router.get("/sessions", getSessions);

// Route to get a session by ID
router.get("/sessions/:id", getSessionById);

// Route to update a session by ID
router.put("/sessions/:id", updateSession);

// Route to delete a session by ID
router.delete("/sessions/:id", deleteSession);

// Route to start a session by ID
router.post("/sessions/:id/start", startSession);

// Route to end a session by ID
router.post("/sessions/:id/end", endSession);

// Route to get the current active session
router.get("/sessions/current", getCurrentSession);

export default router;
