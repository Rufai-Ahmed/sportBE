"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSession = exports.endSession = exports.startSession = exports.addTeamToSession = exports.removeTeamFromSession = exports.deleteSession = exports.updateSession = exports.getSessionById = exports.getSessions = exports.createSession = void 0;
const session_1 = __importDefault(require("../models/session"));
const createSession = async (req, res) => {
    try {
        const { type, startTime, endTime, teams } = req.body;
        const session = await session_1.default.create({
            name: `Start ${type.charAt(0).toUpperCase() + type.slice(1)} Session`,
            startTime,
            endTime,
            type,
            isActive: false,
            teams,
        });
        res.status(201).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createSession = createSession;
// Get all sessions
const getSessions = async (req, res) => {
    try {
        const sessions = await session_1.default.find().populate("teams");
        res.status(200).json(sessions);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getSessions = getSessions;
// Get a session by ID
const getSessionById = async (req, res) => {
    try {
        const session = await session_1.default.findById(req.params.id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getSessionById = getSessionById;
// Update a session
// Update a session
const updateSession = async (req, res) => {
    try {
        const { teams } = req.body;
        // Validate team array length
        if (teams && teams.length > 2) {
            return res
                .status(400)
                .json({ message: "A session can have a maximum of 2 teams." });
        }
        const session = await session_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateSession = updateSession;
// Delete a session
const deleteSession = async (req, res) => {
    try {
        const session = await session_1.default.findByIdAndDelete(req.params.id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        res.status(200).json({ message: "Session deleted" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteSession = deleteSession;
// Remove a team from a session
const removeTeamFromSession = async (req, res) => {
    try {
        const { id, teamId } = req.params;
        // Find the session
        const session = await session_1.default.findById(id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        // Remove the team from the session
        session.teams = session.teams.filter((team) => team.toString() !== teamId);
        await session.save();
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.removeTeamFromSession = removeTeamFromSession;
// Add a team to a session
const addTeamToSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { teamId } = req.body;
        // Find the session
        const session = await session_1.default.findById(id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        // Validate team array length
        if (session.teams.length >= 2) {
            return res
                .status(400)
                .json({ message: "A session can have a maximum of 2 teams." });
        }
        // Add the team to the session
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
// Start a session
const startSession = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await session_1.default.findById(id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        session.isActive = true;
        await session.save();
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.startSession = startSession;
// End a session
const endSession = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await session_1.default.findById(id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        session.isActive = false;
        await session.save();
        // Start the next session if there is one
        await startNextSession(session.type);
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.endSession = endSession;
// Get the current active session
const getCurrentSession = async (req, res) => {
    try {
        const now = new Date();
        const currentSession = await session_1.default.findOne({
            startTime: { $lte: now },
            endTime: { $gte: now },
            isActive: true,
        });
        res.status(200).json(currentSession);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getCurrentSession = getCurrentSession;
// Start the next session based on the current session type
const startNextSession = async (currentType) => {
    let nextType;
    if (currentType === "morning")
        nextType = "afternoon";
    else if (currentType === "afternoon")
        nextType = "evening";
    else
        return; // No more sessions today
    const nextSession = await session_1.default.findOne({
        type: nextType,
        isActive: false,
    });
    if (nextSession) {
        nextSession.isActive = true;
        await nextSession.save();
    }
};
