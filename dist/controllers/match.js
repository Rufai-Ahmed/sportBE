"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchStatus = void 0;
const match_1 = __importDefault(require("../models/match")); // Create a match model as needed
// Update match status
const updateMatchStatus = async (req, res) => {
    try {
        const { matchId, status, goals, yellowCards, redCards, ownGoals } = req.body;
        const match = await match_1.default.findById(matchId);
        if (!match)
            return res.status(404).json({ message: "Match not found" });
        match.status = status;
        match.goals = goals;
        match.yellowCards = yellowCards;
        match.redCards = redCards;
        match.ownGoals = ownGoals;
        await match.save();
        res.status(200).json({ message: "Match updated successfully", match });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateMatchStatus = updateMatchStatus;
