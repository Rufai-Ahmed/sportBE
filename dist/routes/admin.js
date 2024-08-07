"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = require("../middleware/admin.middleware");
const admin_1 = require("../controllers/admin");
const playerController_1 = require("../controllers/playerController");
const match_1 = require("../controllers/match");
const router = (0, express_1.Router)();
router.post("/register", admin_1.registerAdmin);
router.post("/login", admin_1.loginAdmin);
router.post("/create-player", admin_middleware_1.adminAuthMiddleware, playerController_1.createPlayer);
router.put("/update-match", admin_middleware_1.adminAuthMiddleware, match_1.updateMatchStatus);
// Add other admin routes as needed
exports.default = router;
