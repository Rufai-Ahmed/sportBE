"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.getGameById = exports.getGames = exports.createGame = void 0;
const game_1 = __importDefault(require("../models/game"));
const createGame = async (req, res) => {
    try {
        const game = new game_1.default(req.body);
        await game.save();
        res.status(201).json(game);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createGame = createGame;
const getGames = async (req, res) => {
    try {
        const games = await game_1.default.find().populate("teams");
        res.status(200).json(games);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getGames = getGames;
const getGameById = async (req, res) => {
    try {
        const game = await game_1.default.findById(req.params.id).populate("teams");
        if (!game)
            return res.status(404).json({ message: "Game not found" });
        res.status(200).json(game);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getGameById = getGameById;
const updateGame = async (req, res) => {
    try {
        const game = await game_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!game)
            return res.status(404).json({ message: "Game not found" });
        res.status(200).json(game);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateGame = updateGame;
const deleteGame = async (req, res) => {
    try {
        const game = await game_1.default.findByIdAndDelete(req.params.id);
        if (!game)
            return res.status(404).json({ message: "Game not found" });
        res.status(200).json({ message: "Game deleted" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteGame = deleteGame;
