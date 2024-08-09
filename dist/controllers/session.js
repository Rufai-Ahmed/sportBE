"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSession = exports.endSession = exports.startSession = exports.deleteSession = exports.updateSession = exports.getSessionById = exports.getSessions = exports.createSession = void 0;
const session_1 = __importDefault(require("../models/session"));
// Create a new session
const createSession = async (req, res) => {
    try {
        const { type, startTime, endTime } = req.body;
        const session = await session_1.default.create({
            name: `Start ${type.charAt(0).toUpperCase() + type.slice(1)} Session`,
            startTime,
            endTime,
            type,
            isActive: false,
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
        const sessions = await session_1.default.find();
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
const updateSession = async (req, res) => {
    try {
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
