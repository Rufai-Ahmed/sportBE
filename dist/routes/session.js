"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = require("../controllers/session");
const router = (0, express_1.Router)();
// Route to create a new session
router.post("/sessions", session_1.createSession);
// Route to get all sessions
router.get("/sessions", session_1.getSessions);
// Route to get a session by ID
router.get("/sessions/:id", session_1.getSessionById);
// Route to update a session by ID
router.put("/sessions/:id", session_1.updateSession);
// Route to delete a session by ID
router.delete("/sessions/:id", session_1.deleteSession);
// Route to start a session by ID
router.post("/sessions/:id/start", session_1.startSession);
// Route to end a session by ID
router.post("/sessions/:id/end", session_1.endSession);
// Route to get the current active session
router.get("/sessions/current", session_1.getCurrentSession);
exports.default = router;
