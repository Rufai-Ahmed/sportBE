"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayer = exports.updatePlayer = exports.getPlayerById = exports.getPlayers = exports.loginPlayer = exports.createPlayer = void 0;
const player_1 = __importDefault(require("../models/player"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// Register a new player
const createPlayer = async (req, res) => {
    try {
        const { username, password, phoneNumber, photo } = req.body;
        const player = await player_1.default.create({
            username,
            password,
            phoneNumber,
            photo,
        });
        res.status(201).json({ message: "Player registered successfully", player });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createPlayer = createPlayer;
// Login player
const loginPlayer = async (req, res) => {
    try {
        const { username, password } = req.body;
        const player = await player_1.default.findOne({ username });
        if (!player) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = await player.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
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
        if (password)
            player.password = password; // Password should be hashed in pre-save hook
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
