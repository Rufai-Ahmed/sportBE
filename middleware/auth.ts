import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import adminModel from "../models/admin.model";

interface CustomRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const admin = await adminModel.findById(decoded.id);

    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    req.user = admin; // Attach admin to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });
    (req as any).userId = (decoded as any).id;
    next();
  });
};
