"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../utils/constant");
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        res.status(401).json({
            message: "Access denied, no token provided",
        });
    try {
        const decode = jsonwebtoken_1.default.verify(token, constant_1.SECRET);
        req.user = decode;
        next();
    }
    catch (ex) {
        res.status(400).json({ error: "Invalid token", err: ex.message });
    }
};
exports.isAuthenticated = isAuthenticated;
