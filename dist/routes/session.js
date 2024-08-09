"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = require("../controllers/session");
const router = (0, express_1.Router)();
// Session Routes
router.post("/sessions", session_1.createSession);
router.get("/sessions", session_1.getSessions);
router.get("/sessions/:id", session_1.getSessionById);
router.put("/sessions/:id", session_1.updateSession);
router.delete("/sessions/:id", session_1.deleteSession);
router.post("/sessions/:id/start", session_1.startSession);
router.post("/sessions/:id/end", session_1.endSession);
router.get("/sessions/current", session_1.getCurrentSession);
// Team Management Routes
router.post("/sessions/:id/teams", session_1.addTeamToSession); // Add a team to a session
router.delete("/sessions/:id/teams/:teamId", session_1.removeTeamFromSession); // Remove a team from a session
exports.default = router;
