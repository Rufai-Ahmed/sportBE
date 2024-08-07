"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.getTeamById = exports.getTeams = exports.createTeam = void 0;
const team_1 = __importDefault(require("../models/team"));
const createTeam = async (req, res) => {
    try {
        const team = team_1.default.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createTeam = createTeam;
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
