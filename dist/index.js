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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./utils/errorHandler");
const player_1 = __importDefault(require("./routes/player"));
const team_1 = __importDefault(require("./routes/team"));
const payment_1 = __importDefault(require("./routes/payment"));
const session_1 = __importDefault(require("./routes/session"));
const auth_1 = __importDefault(require("./routes/auth"));
const game_1 = __importDefault(require("./routes/game"));
const match_1 = __importDefault(require("./routes/match"));
const admin_1 = __importDefault(require("./routes/admin"));
const auth_2 = require("./middleware/auth");
const admin_middleware_1 = require("./middleware/admin.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
// Apply middleware and routes
app.use("/players", auth_2.authMiddleware, player_1.default);
app.use("/teams", auth_2.authMiddleware, team_1.default);
app.use("/payments", auth_2.authMiddleware, payment_1.default);
app.use("/sessions", auth_2.authMiddleware, session_1.default);
app.use("/games", auth_2.authMiddleware, game_1.default);
app.use("/matches", admin_middleware_1.adminAuthMiddleware, match_1.default); // Protect match routes with adminAuthMiddleware
app.use("/admin", admin_1.default); // Protect admin routes with adminAuthMiddleware
app.use("/api/v1", auth_1.default);
app.use(errorHandler_1.errorHandler);
mongoose_1.default
    .connect(process.env.URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
