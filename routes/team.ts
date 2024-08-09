import { Router } from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addTeamToSession,
  removeTeamFromSession,
} from "../controllers/team";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);
router.post("/sessions/:sessionId/teams/:teamId", addTeamToSession);
router.delete("/sessions/:sessionId/teams/:teamId", removeTeamFromSession);

export default router;
