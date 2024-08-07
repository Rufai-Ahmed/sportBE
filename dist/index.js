"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importStar(require("express"));
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./utils/dbConfig");
const constant_1 = require("./utils/constant");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000", "https://yourdomain.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, express_1.json)());
app.use((0, cors_1.default)(corsOptions));
(0, mainApp_1.mainApp)(app);
const server = app.listen(constant_1.port, () => {
    console.clear();
    (0, dbConfig_1.dbConfig)();
    console.log(`Server is running on port ${constant_1.port}`);
});
process
    .on("uncaughtException", (error) => {
    console.log("error: ", error);
    process.exit(1);
})
    .on("unhandledRejection", (reason) => {
    console.log("reason: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
