import { Request, Response } from "express";
import Team from "../models/team";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = Team.create(req.body);

    res.status(201).json(team);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate("players");
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

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

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
