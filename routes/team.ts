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

const router = Router();

router.post("/", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);
router.post("/sessions/:sessionId/teams/:teamId", addTeamToSession);
router.delete("/sessions/:sessionId/teams/:teamId", removeTeamFromSession);

export default router;
