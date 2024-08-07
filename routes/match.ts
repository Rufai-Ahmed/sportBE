import { Router } from "express";
import { updateMatchStatus } from "../controllers/match";

// Create a new router instance
const router = Router();

// Route for updating match status
router.put("/update", updateMatchStatus);

// Add other match-related routes as needed

export default router;
