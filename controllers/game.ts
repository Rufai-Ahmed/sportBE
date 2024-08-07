import { Request, Response } from "express";
import Game from "../models/game";
import Team from "../models/team";

export const createGame = async (req: Request, res: Response) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find().populate("teams");
    res.status(200).json(games);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id).populate("teams");
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.status(200).json(game);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGame = async (req: Request, res: Response) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.status(200).json(game);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.status(200).json({ message: "Game deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
