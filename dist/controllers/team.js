"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTeamFromSession = exports.addTeamToSession = exports.deleteTeam = exports.updateTeam = exports.getTeamById = exports.getTeams = exports.createTeam = void 0;
const team_1 = __importDefault(require("../models/team"));
const session_1 = __importDefault(require("../models/session"));
// Create a new team
const createTeam = async (req, res) => {
    try {
        const team = await team_1.default.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createTeam = createTeam;
// Get all teams
const getTeams = async (req, res) => {
    try {
        const teams = await team_1.default.find().populate("players");
        res.status(200).json(teams);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getTeams = getTeams;
// Get a team by ID
const getTeamById = async (req, res) => {
    try {
        const team = await team_1.default.findById(req.params.id).populate("players");
        if (!team)
            return res.status(404).json({ message: "Team not found" });
        res.status(200).json(team);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getTeamById = getTeamById;
// Update a team
const updateTeam = async (req, res) => {
    try {
        const team = await team_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!team)
            return res.status(404).json({ message: "Team not found" });
        res.status(200).json(team);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateTeam = updateTeam;
// Delete a team
const deleteTeam = async (req, res) => {
    try {
        const team = await team_1.default.findByIdAndDelete(req.params.id);
        if (!team)
            return res.status(404).json({ message: "Team not found" });
        res.status(200).json({ message: "Team deleted" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteTeam = deleteTeam;
// Add a team to a session
const addTeamToSession = async (req, res) => {
    try {
        const { sessionId, teamId } = req.params;
        const session = await session_1.default.findById(sessionId);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        if (!session.teams.includes(teamId)) {
            session.teams.push(teamId);
            await session.save();
        }
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addTeamToSession = addTeamToSession;
// Remove a team from a session
const removeTeamFromSession = async (req, res) => {
    try {
        const { sessionId, teamId } = req.params;
        const session = await session_1.default.findById(sessionId);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        session.teams = session.teams.filter((id) => id.toString() !== teamId);
        await session.save();
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.removeTeamFromSession = removeTeamFromSession;
