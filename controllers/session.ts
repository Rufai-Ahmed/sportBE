import { Request, Response } from "express";
import Session from "../models/session";

// Create a new session
export const createSession = async (req: Request, res: Response) => {
  try {
    const { type, startTime, endTime } = req.body;
    const session = await Session.create({
      name: `Start ${type.charAt(0).toUpperCase() + type.slice(1)} Session`,
      startTime:
        type === "morning"
          ? "7:00am"
          : type === "afternoon"
          ? "1:00pm"
          : "5:00pm",
      endTime:
        type === "morning"
          ? "12:00pm"
          : type === "afternoon"
          ? "4:00pm"
          : "10:00pm",
      type,
      isActive: false,
    });
    res.status(201).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all sessions
export const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get a session by ID
export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update a session
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

// Delete a session
export const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json({ message: "Session deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Start a session
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

// End a session
export const endSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.isActive = false;
    await session.save();

    // Start the next session if there is one
    await startNextSession(session.type as "morning" | "afternoon" | "evening");

    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get the current active session
export const getCurrentSession = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const currentSession = await Session.findOne({
      startTime: { $lte: now },
      endTime: { $gte: now },
      isActive: true,
    });
    res.status(200).json(currentSession);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Start the next session based on the current session type
const startNextSession = async (
  currentType: "morning" | "afternoon" | "evening"
) => {
  let nextType: "morning" | "afternoon" | "evening";
  if (currentType === "morning") nextType = "afternoon";
  else if (currentType === "afternoon") nextType = "evening";
  else return; // No more sessions today

  const nextSession = await Session.findOne({
    type: nextType,
    isActive: false,
  });
  if (nextSession) {
    nextSession.isActive = true;
    await nextSession.save();
  }
};
