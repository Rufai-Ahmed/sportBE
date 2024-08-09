import { Request, Response } from "express";
import Admin from "../models/admin.model";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.create({ username, password });
    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: admin._id }, config.jwtSecret, {
      expiresIn: "2w",
    });

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
