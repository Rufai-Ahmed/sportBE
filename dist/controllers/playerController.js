"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayer = exports.updatePlayer = exports.getPlayerById = exports.getPlayers = exports.loginPlayer = exports.removePlayerFromTeam = exports.addPlayerToTeam = exports.createPlayer = void 0;
const player_1 = __importDefault(require("../models/player"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const team_1 = __importDefault(require("../models/team")); // Make sure this import is correct
// Register a new player
const createPlayer = async (req, res) => {
    try {
        const { username, password, phoneNumber, photo, teamId } = req.body;
        // Create the player
        const player = await player_1.default.create({
            username,
            password,
            phoneNumber,
            photo,
        });
        // If a teamId is provided, add the player to the team
        if (teamId) {
            const team = await team_1.default.findById(teamId);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            if (!team.players.includes(player._id)) {
                team.players.push(player._id);
                await team.save();
            }
        }
        res.status(201).json({ message: "Player registered successfully", player });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createPlayer = createPlayer;
// Add additional player-team handling functions
const addPlayerToTeam = async (req, res) => {
    try {
        const { teamId, playerId } = req.params;
        const team = await team_1.default.findById(teamId);
        if (!team)
            return res.status(404).json({ message: "Team not found" });
        const player = await player_1.default.findById(playerId);
        if (!player)
            return res.status(404).json({ message: "Player not found" });
        if (!team.players.includes(playerId)) {
            team.players.push(playerId);
            await team.save();
        }
        res.status(200).json(team);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addPlayerToTeam = addPlayerToTeam;
const removePlayerFromTeam = async (req, res) => {
    try {
        const { teamId, playerId } = req.params;
        const team = await team_1.default.findById(teamId);
        if (!team)
            return res.status(404).json({ message: "Team not found" });
        team.players = team.players.filter((id) => id.toString() !== playerId);
        await team.save();
        res.status(200).json(team);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.removePlayerFromTeam = removePlayerFromTeam;
// Login player
const loginPlayer = async (req, res) => {
    try {
        const { username, password } = req.body;
        const player = await player_1.default.findOne({ username });
        if (!player) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        // const isMatch = await player.comparePassword(password);
        // if (!isMatch) {
        //   return res.status(400).json({ message: "Invalid username or password" });
        // }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: player._id }, config_1.config.jwtSecret, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginPlayer = loginPlayer;
// Get all players
const getPlayers = async (req, res) => {
    try {
        const players = await player_1.default.find();
        res.status(200).json(players);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getPlayers = getPlayers;
// Get a player by ID
const getPlayerById = async (req, res) => {
    try {
        const player = await player_1.default.findById(req.params.id);
        if (!player)
            return res.status(404).json({ message: "Player not found" });
        res.status(200).json(player);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getPlayerById = getPlayerById;
// Update a player
const updatePlayer = async (req, res) => {
    try {
        const { username, password, phoneNumber, photo, club } = req.body;
        const player = await player_1.default.findById(req.params.id);
        if (!player)
            return res.status(404).json({ message: "Player not found" });
        if (username)
            player.username = username;
        // if (password) player.password = password; // Password should be hashed in pre-save hook
        if (phoneNumber)
            player.phoneNumber = phoneNumber;
        if (photo)
            player.photo = photo;
        if (club)
            player.club = club;
        await player.save();
        res.status(200).json({ message: "Player updated successfully", player });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePlayer = updatePlayer;
// Delete a player
const deletePlayer = async (req, res) => {
    try {
        const player = await player_1.default.findByIdAndDelete(req.params.id);
        if (!player)
            return res.status(404).json({ message: "Player not found" });
        res.status(200).json({ message: "Player deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deletePlayer = deletePlayer;
