import { Request, Response } from "express";
import Session from "../models/session";

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json({ message: "Session deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const startSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.isActive = true;
    await session.save();
    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const endSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.isActive = false;
    await session.save();
    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
