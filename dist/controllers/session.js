"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endSession = exports.startSession = exports.deleteSession = exports.updateSession = exports.getSessionById = exports.getSessions = exports.createSession = void 0;
const session_1 = __importDefault(require("../models/session"));
const createSession = async (req, res) => {
    try {
        const session = new session_1.default(req.body);
        await session.save();
        res.status(201).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createSession = createSession;
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
const endSession = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await session_1.default.findById(id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        session.isActive = false;
        await session.save();
        res.status(200).json(session);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.endSession = endSession;
