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
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const player_1 = __importDefault(require("./routes/player"));
const team_1 = __importDefault(require("./routes/team"));
const payment_1 = __importDefault(require("./routes/payment"));
const session_1 = __importDefault(require("./routes/session"));
const game_1 = __importDefault(require("./routes/game"));
const errorHandler_1 = require("./utils/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use("/players", auth_1.authMiddleware, player_1.default);
app.use("/teams", auth_1.authMiddleware, team_1.default);
app.use("/payments", auth_1.authMiddleware, payment_1.default);
app.use("/sessions", auth_1.authMiddleware, session_1.default);
app.use("/games", auth_1.authMiddleware, game_1.default);
app.use(errorHandler_1.errorHandler);
mongoose_1.default
    .connect(process.env.URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
