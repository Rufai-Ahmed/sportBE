import { Request, Response } from "express";
import Session from "../models/session";
import mongoose from "mongoose";

export const createSession = async (req: Request, res: Response) => {
  try {
    const { type, startTime, endTime, teams } = req.body;

    // Validate team array length
    if (teams.length > 2) {
      return res
        .status(400)
        .json({ message: "A session can have a maximum of 2 teams." });
    }

    const session = await Session.create({
      name: `Start ${type.charAt(0).toUpperCase() + type.slice(1)} Session`,
      startTime,
      endTime,
      type,
      isActive: false,
      teams,
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
// Update a session
export const updateSession = async (req: Request, res: Response) => {
  try {
    const { teams } = req.body;

    // Validate team array length
    if (teams && teams.length > 2) {
      return res
        .status(400)
        .json({ message: "A session can have a maximum of 2 teams." });
    }

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

// Remove a team from a session
export const removeTeamFromSession = async (req: Request, res: Response) => {
  try {
    const { id, teamId } = req.params;

    // Find the session
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Remove the team from the session
    session.teams = session.teams.filter(
      (team: mongoose.Schema.Types.ObjectId) => team.toString() !== teamId
    );
    await session.save();

    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Add a team to a session
export const addTeamToSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { teamId } = req.body;

    // Find the session
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Validate team array length
    if (session.teams.length >= 2) {
      return res
        .status(400)
        .json({ message: "A session can have a maximum of 2 teams." });
    }

    // Add the team to the session
    if (!session.teams.includes(teamId)) {
      session.teams.push(teamId);
      await session.save();
    }

    res.status(200).json(session);
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
