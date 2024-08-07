import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import Admin from "../models/admin.model";

interface JwtPayload {
  id: string;
}

interface CustomRequest extends Request {
  user?: any; // Optional property
}

// Define middleware as RequestHandler
export const adminAuthMiddleware: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    req.user = admin; // Attach admin to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
