import express, { json } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import playerRoutes from "./routes/player";
import teamRoutes from "./routes/team";
import paymentRoutes from "./routes/payment";
import sessionRoutes from "./routes/session";
import gameRoutes from "./routes/game";
import { errorHandler } from "./utils/errorHandler";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();
app.use(json());

app.use("/players", authMiddleware, playerRoutes);
app.use("/teams", authMiddleware, teamRoutes);
app.use("/payments", authMiddleware, paymentRoutes);
app.use("/sessions", authMiddleware, sessionRoutes);
app.use("/games", authMiddleware, gameRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.URI!)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
