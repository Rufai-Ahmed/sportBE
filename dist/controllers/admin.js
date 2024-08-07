"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.registerAdmin = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await admin_model_1.default.create({ username, password });
        res.status(201).json({ message: "Admin registered successfully", admin });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.registerAdmin = registerAdmin;
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await admin_model_1.default.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, config_1.config.jwtSecret, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginAdmin = loginAdmin;
