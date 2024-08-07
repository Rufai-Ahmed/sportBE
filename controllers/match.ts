import { Request, Response } from "express";
import Match from "../models/match"; // Create a match model as needed

// Update match status
export const updateMatchStatus = async (req: Request, res: Response) => {
  try {
    const { matchId, status, goals, yellowCards, redCards, ownGoals } =
      req.body;
    const match = await Match.findById(matchId);

    if (!match) return res.status(404).json({ message: "Match not found" });

    match.status = status;
    match.goals = goals;
    match.yellowCards = yellowCards;
    match.redCards = redCards;
    match.ownGoals = ownGoals;

    await match.save();
    res.status(200).json({ message: "Match updated successfully", match });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
