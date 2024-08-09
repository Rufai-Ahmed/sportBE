import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler";
import playerRoutes from "./routes/player";
import teamRoutes from "./routes/team";
import paymentRoutes from "./routes/payment";
import sessionRoutes from "./routes/session";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import matchRoutes from "./routes/match";
import adminRoutes from "./routes/admin";
import { authMiddleware } from "./middleware/auth";
import { adminAuthMiddleware } from "./middleware/admin.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// Apply middleware and routes
app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/payments", authMiddleware, paymentRoutes);
app.use("/sessions", sessionRoutes);
app.use("/games", authMiddleware, gameRoutes);
app.use("/matches", adminAuthMiddleware, matchRoutes); // Protect match routes with adminAuthMiddleware
app.use("/admin", adminRoutes); // Protect admin routes with adminAuthMiddleware
app.use("/api/v1", authRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.URI!)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
