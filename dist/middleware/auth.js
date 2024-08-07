"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
        return res.status(401).json({ message: "Access denied" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token)
        return res.status(403).json({ message: "No token provided" });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(500).json({ message: "Failed to authenticate token" });
        req.userId = decoded.id;
        next();
    });
};
exports.verifyToken = verifyToken;
