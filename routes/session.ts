import { Router } from "express";
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "../controllers/session";

const router = Router();

router.post("/", createSession);
router.get("/", getSessions);
router.get("/:id", getSessionById);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

export default router;
