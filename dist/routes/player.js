"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const playerController_1 = require("../controllers/playerController");
const router = (0, express_1.Router)();
router.post("/login", playerController_1.loginPlayer); // New login route
router.get("/", playerController_1.getPlayers);
router.get("/:id", playerController_1.getPlayerById);
router.put("/:id", playerController_1.updatePlayer);
router.delete("/:id", playerController_1.deletePlayer);
exports.default = router;
