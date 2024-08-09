import { Request, Response } from "express";
import Team from "../models/team";
import Session from "../models/session";

// Create a new team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all teams
export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate("players");
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get a team by ID
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update a team
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a team
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Add a team to a session
export const addTeamToSession = async (req: Request, res: Response) => {
  try {
    const { sessionId, teamId }: any = req.params;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (!session.teams.includes(teamId!)) {
      session.teams.push(teamId!);
      await session.save();
    }

    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a team from a session
export const removeTeamFromSession = async (req: Request, res: Response) => {
  try {
    const { sessionId, teamId } = req.params;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.teams = session.teams.filter((id) => id.toString() !== teamId);
    await session.save();

    res.status(200).json(session);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
