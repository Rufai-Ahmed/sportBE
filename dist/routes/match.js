"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_1 = require("../controllers/match");
// Create a new router instance
const router = (0, express_1.Router)();
// Route for updating match status
router.put("/update", match_1.updateMatchStatus);
// Add other match-related routes as needed
exports.default = router;
